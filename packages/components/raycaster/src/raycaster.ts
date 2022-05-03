import { Camera, Group, Object3D, Raycaster, Vector2 } from "three";
import type { Vector3, Mesh, Intersection, Event } from "three";
import { filterV3dNode, getCore } from "@sandi-ui/utils";
import { inject } from "vue";
import { RENDER_ID, SCENE_ID } from "@sandi-ui/constants";
import { EventType, SDEvent, V3dNodeCheck } from "@sandi-ui/enum";
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
  let windowSize: { width: number; height: number };
  const raycaster = new Raycaster(origin, direction, near, far);
  const { parentId, id } = core.addNode(raycaster);
  const renderId = inject<number>(RENDER_ID);
  const sceneId = inject<number>(SCENE_ID);
  const mouse = new Vector2();

  const checkBack = () => {
    if (isEnable) {
      // Local coordinates transfrom world coordinates
      raycaster.ray.origin.copy(mouse, camera as Camera);

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
  if (renderId) {
    core.dispatchEventById(renderId, {
      type: EventType.Render,
      render: checkBack,
    });
  }

  const remove = () => {
    if (renderId) {
      core.dispatchEventById(renderId, {
        type: EventType.RemoveRender,
        render: checkBack,
      });
    }
  };
  const setObject = () => {};

  return {
    setEnabled,
    setInspectionScope,
    updateBack,
    instance: raycaster,
    remove,
  };
};
export default useRaycaster;
