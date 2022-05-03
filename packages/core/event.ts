import {
  BufferGeometry,
  Camera,
  Group,
  Material,
  Object3D,
  Raycaster,
  Vector2,
} from "three";
import type { Vector3, Mesh, Intersection, Event } from "three";
import { filterV3dNode, getCore } from "@sandi-ui/utils";
import { inject } from "vue";
import { RENDER_ID, SCENE_ID } from "@sandi-ui/constants";
import { EventType, SDEvent, V3dNodeCheck } from "@sandi-ui/enum";
import type { WebGLRendererWrap } from "@sandi-ui/modules";
const useEvent = (renderNode: WebGLRendererWrap, camera: Camera) => {
  const core = getCore();
  let inspectionScope = "scene";
  let recursive = true;
  let windowSize: { width: number; height: number };
  let domElement = renderNode.domElement.parentElement;
  const instance = new Raycaster();
  const renderId = inject<number>(RENDER_ID);
  const mouse = new Vector2();
  const { parentId, id } = core.addNode(instance);
  const sceneId = inject<number>(SCENE_ID);
  interface SDEventOrign {
    target: Mesh<BufferGeometry, Material | Material[]> | Group | null;
    objects: (Mesh<BufferGeometry, Material | Material[]> | Group)[];
    intersects: Intersection<Object3D<Event>>[];
    type: SDEvent;
    domEvent: MouseEvent | KeyboardEvent | null;
  }
  const SD_Event: SDEventOrign = {
    target: null,
    objects: [],
    intersects: [],
    type: SDEvent.None,
    domEvent: null,
  };
  if (renderId) {
    core.addEventListenerById(renderId, EventType.RenderSizeChang, (event) => {
      const { width, height } = event;
      windowSize = { width, height };
    });
    camera = renderNode.getCamera() as Camera;
  }
  const pointOverAndOut = () => {
    const { target, objects, intersects, type } = SD_Event;
    if (intersects.length > 0) {
      const object = intersects[0].object;
      const { userData } = object;
      // check is FBX GLTF
      if (userData.primitive && userData.parentId) {
        // is out model
        if (prevId !== userData.parentId) {
          const v3dNode = core.getNode(userData.parentId);
          const callBackFn = core.getEvenet(
            SDEvent.PointerOver,
            userData.parentId
          );
          if (callBackFn && typeof callBackFn === "function") callBackFn();
        }
      } else {
        const v3dNode = core.getNodeWithObject(object);
        if (prevId !== v3dNode.id) {
          const PointerOvercallBackFn = core.getEvenet(
            SDEvent.PointerOver,
            v3dNode.id
          );
          if (typeof PointerOvercallBackFn === "function")
            PointerOvercallBackFn();
          const PointerOutcallBackFn = core.getEvenet(
            SDEvent.PointerOut,
            v3dNode.id
          );
          if (typeof PointerOutcallBackFn === "function")
            PointerOutcallBackFn();
          prevId = v3dNode.id;
        }
      }
    }
  };
  const scane = () => {
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
      SD_Event.objects = checkAry;
      SD_Event.intersects = intersects;
      pointOverAndOut();
    }
  };

  const updateMouse = (event: MouseEvent) => {
    event.preventDefault();
    mouse.x = (event.offsetX / windowSize.width) * 2 - 1;
    mouse.y = -(event.offsetY / windowSize.height) * 2 + 1;
    instance.setFromCamera(mouse, camera as Camera);
  };

  let prevId = -1;
  const handleEvent = (event: MouseEvent) => {
    event.preventDefault();
    updateMouse(event);
    SD_Event.type = event.type as SDEvent;
    const { target, objects, intersects, type } = SD_Event;
    if (intersects.length >= 0) {
      let object: Object3D<Event> | null = intersects[0].object;
      let stop = false;
      //  bubbling
      while (!stop && object) {
        let SD_Node;
        const { userData } = object;
        // check is FBX GLTF ?
        if (userData.primitive && userData.parentId) {
          // is FBX GLTF
          SD_Node = core.getNode(userData.parentId);
        } else {
          // normal node
          SD_Node = core.getNodeWithObject(object);
        }
        // SD_Node not found in Core Map
        if (SD_Node) {
          // get callBackFn
          const callBackFn = core.getEvenet(type, SD_Node.id);
          if (typeof callBackFn === "function") callBackFn();
          object = SD_Node.node.parent;
        } else {
          object = object.parent;
        }
      }
    } else {
      // triger PointerMissed
    }
  };
  if (renderId) {
    core.dispatchEventById(renderId, { type: EventType.Render, render: scane });
  }
  domElement?.addEventListener(SDEvent.Click, handleEvent);
  //   domElement?.addEventListener(SDEvent.PointerOver, handleEvent);
  //   domElement?.addEventListener(SDEvent.PointerOut, handleEvent);
  domElement?.addEventListener(SDEvent.PointerMove, handleEvent);
  domElement?.addEventListener(SDEvent.PointerDown, handleEvent);
  domElement?.addEventListener(SDEvent.PointerUp, handleEvent);
  domElement?.addEventListener(SDEvent.Wheel, handleEvent);
  domElement?.addEventListener(SDEvent.DoubleClick, handleEvent);

  const remove = () => {
    domElement?.removeEventListener(SDEvent.Click, handleEvent);
    // domElement?.removeEventListener(SDEvent.PointerOver, handleEvent);
    // domElement?.removeEventListener(SDEvent.PointerOut, handleEvent);
    domElement?.removeEventListener(SDEvent.PointerMove, handleEvent);
    domElement?.removeEventListener(SDEvent.PointerDown, handleEvent);
    domElement?.removeEventListener(SDEvent.PointerUp, handleEvent);
    domElement?.removeEventListener(SDEvent.Wheel, handleEvent);
    domElement?.removeEventListener(SDEvent.DoubleClick, handleEvent);
  };

  return {
    remove,
  };
};
export default useEvent;
