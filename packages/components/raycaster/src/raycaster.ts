import { Camera, Group, Object3D, Raycaster, Vector2 } from "three";
import type { Vector3, Mesh, Intersection, Event } from "three";
import { filterV3dNode, getCore } from "@sandi-ui/utils";
import { inject } from "vue";
import { RENDER_ID, SCENE_ID } from "@sandi-ui/constants";
import { EventType, SDMouseEvent, V3dNodeCheck } from "@sandi-ui/enum";
import type { WebGLRendererWrap } from "@sandi-ui/modules";
const useRaycaster = (
  origin: Vector3 | undefined,
  direction: Vector3 | undefined,
  near: number | undefined,
  far: number | undefined
) => {
  const core = getCore();
  let isEnable = true;
  let recursive = false;
  let renderNode;
  let raycasterCallback;
  let inspectionScope = "scene";
  let camera;
  let mode;
  let windowSize: { width: number; height: number };
  const instance = new Raycaster(origin, direction, near, far);
  const { parentId, id } = core.addNode(instance);
  const renderId = inject<number>(RENDER_ID);
  const sceneId = inject<number>(SCENE_ID);
  const mouse = new Vector2();

  if (renderId) {
    renderNode = core.getNode<WebGLRendererWrap>(renderId);
    core.addEventListenerById(renderId, EventType.RenderSizeChang, (event) => {
      const { width, height } = event;
      windowSize = { width, height };
    });
    camera = renderNode.node.getCamera() as Camera;
  }

  const pointermove = (event: MouseEvent) => {
    event.preventDefault();
    mouse.x = (event.offsetX / windowSize.width) * 2 - 1;
    mouse.y = -(event.offsetY / windowSize.height) * 2 + 1;
    instance.setFromCamera(mouse, camera as Camera);
  };
  const checkBackWarp = (inspectionBack) => {
    const checkBack = (event: MouseEvent) => {
      if (isEnable) {
        if (event instanceof MouseEvent) {
          event.preventDefault();
          mouse.x = (event.offsetX / windowSize.width) * 2 - 1;
          mouse.y = -(event.offsetY / windowSize.height) * 2 + 1;
          instance.setFromCamera(mouse, camera as Camera);
        }
        let startId;
        if (inspectionScope == "scene" && parentId) {
          // parentNode start
          startId = parentId;
        } else {
          if (sceneId) {
            // scene start
            startId = sceneId;
          }
        }
        if (startId) {
          const childrens = core.getChildrens(startId).map((item) => item.node);

          const checkAry = filterV3dNode(
            childrens,
            [
              V3dNodeCheck.isMesh,
              V3dNodeCheck.isGroup,
              V3dNodeCheck.isFBX,
              V3dNodeCheck.isGLTF,
            ],
            true
          );
          const intersects = instance.intersectObjects(checkAry, recursive);
          if (intersects.length > 0) {
            if (!checkAry.includes(intersects[0].object as Mesh | Group)) {
              let mesh = intersects[0].object as Mesh | Group;
              while (mesh.parent && !checkAry.includes(mesh)) {
                mesh = mesh.parent as Mesh | Group;
              }
              inspectionBack(mesh, checkAry, intersects);
            } else {
              inspectionBack(intersects[0].object, checkAry, intersects);
            }
          } else {
            inspectionBack(null, checkAry, intersects);
          }
        }
      }
    };
    return checkBack;
  };
  const onlyClick = checkBackWarp(
    (
      target: Object3D<Event> | null,
      ary: Object3D<Event>[],
      intersects: Intersection<Object3D<Event>>[]
    ) => {
      raycasterCallback(target, ary, intersects);
      // trigger mesh click fn
      let stopClick = false;
      while (!stopClick && target) {
        let v3dNode = core.getNodeWithObject(target);
        if (v3dNode) {
          const click = core.getEvenet(SDMouseEvent.Click, v3dNode.id);
          console.log("click:", click);
          if (typeof click === "function" && click() === false) {
            stopClick = true;
          }
        }
        target = target.parent;
      }
    }
  );

  let prevId = -1;
  const onlyScan = checkBackWarp(
    (
      target: Object3D<Event> | null,
      ary: Object3D<Event>[],
      intersects: Intersection<Object3D<Event>>[]
    ) => {
      if (!target && prevId) {
        prevId;
      }
      raycasterCallback(target, ary, intersects);
      let stopPointerOver = false;
      let stopPointerOut = false;
      while ((!stopPointerOver || !stopPointerOut) && target) {
        let v3dNode = core.getNodeWithObject(target);
        if (v3dNode) {
          const PointerOver = core.getEvenet(
            SDMouseEvent.PointerOver,
            v3dNode.id
          );

          if (typeof PointerOver === "function" && PointerOver() === false) {
            if (prevId != -1 && prevId !== v3dNode.id) {
              const PointerOut = core.getEvenet(
                SDMouseEvent.PointerOver,
                v3dNode.id
              );
              if (typeof PointerOut === "function" && PointerOut() === false) {
                stopPointerOut = false;
              }
              prevId = -1;
            } else {
              prevId = v3dNode.id;
            }
            stopPointerOver = false;
          }
        }

        target = target.parent;
      }
    }
  );
  const clearEvent = () => {
    if (renderId) {
      renderNode.node.domElement.removeEventListener("click", onlyClick);
      renderNode.node.domElement.removeEventListener("pointermove", onlyClick);
      renderNode.node.domElement.removeEventListener("pointermove", onlyScan);
      core.dispatchEventById(renderId, {
        type: EventType.RemoveRender,
        render: onlyClick,
      });
      core.dispatchEventById(renderId, {
        type: EventType.RemoveRender,
        render: onlyScan,
      });
    }
  };
  const changeMode = (newMode) => {
    mode = newMode;
    if (renderNode && renderId) {
      // clear callback
      clearEvent();
      switch (newMode) {
        case "normal":
          renderNode.node.domElement.addEventListener(
            "pointermove",
            pointermove
          );
          core.dispatchEventById(renderId, {
            type: EventType.Render,
            render: onlyScan,
          });
          break;
        case "onlyClick":
          renderNode.node.domElement.addEventListener("click", onlyClick);
          break;
        case "scanAndClick":
          renderNode.node.domElement.addEventListener(
            "pointermove",
            pointermove
          );
          core.dispatchEventById(renderId, {
            type: EventType.Render,
            render: onlyScan,
          });
          renderNode.node.domElement.addEventListener("click", onlyClick);
          break;
        case "ScanAndtrigger":
          renderNode.node.domElement.addEventListener(
            "pointermove",
            pointermove
          );
          core.dispatchEventById(renderId, {
            type: EventType.Render,
            render: onlyClick,
          });
          break;
        default:
          renderNode.node.domElement.addEventListener(
            "pointermove",
            pointermove
          );
          core.dispatchEventById(renderId, {
            type: EventType.Render,
            render: onlyScan,
          });
      }
    }
  };
  const updateBack = (
    fn: (
      target: Object3D<Event>,
      ary: Object3D<Event>[],
      intersects: Intersection<Object3D<Event>>[]
    ) => void
  ) => {
    raycasterCallback = fn;
  };
  const setEnabled = (state: boolean) => {
    isEnable = state;
  };

  const setInspectionScope = (mode: string) => {
    inspectionScope = mode;
  };

  const remove = () => {
    clearEvent();
  };

  return {
    changeMode,
    setEnabled,
    setInspectionScope,
    updateBack,
    instance,
    remove,
  };
};
export default useRaycaster;
