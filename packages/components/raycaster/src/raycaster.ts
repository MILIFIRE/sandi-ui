import {
  ArrowHelper,
  Camera,
  CylinderGeometry,
  Group,
  Matrix4,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  Raycaster,
  Vector2,
} from "three";
import { Mesh, Vector3 } from "three";
import type { Intersection, Event } from "three";
import { filterV3dNode, getCore } from "@sandi-ui/utils";
import { inject } from "vue";
import { RENDER_ID, SCENE_ID } from "@sandi-ui/constants";
import { EventType, SDEvent, V3dNodeCheck } from "@sandi-ui/enum";
import type { WebGLRendererWrap } from "@sandi-ui/modules";
const useRaycaster = (
  origin: Vector3,
  direction: Vector3,
  near: number,
  far: number
) => {
  const core = getCore();
  let isEnable = true;
  let recursive = false;
  let lockDirection = true;
  let offset = new Vector3();
  let renderNode;
  let raycasterCallback;
  let inspectionScope = "scene";
  let windowSize: { width: number; height: number };
  const raycaster = new Raycaster(origin, direction, near, far);
  const { parentId, id } = core.addNode(raycaster);
  const renderId = inject<number>(RENDER_ID);
  const sceneId = inject<number>(SCENE_ID);
  const mouse = new Vector2();
  const object: Object3D | null = null;
  let helperEnable = false;
  let arrowHelper: ArrowHelper | null;
  const genHelper = (raycaster: Raycaster) => {
    arrowHelper = new ArrowHelper(
      raycaster.ray.direction,
      raycaster.ray.origin,
      raycaster.far === Infinity ? 20000 : raycaster.far,
      0xff0000
    );
    const scene = core.getNode(sceneId as number);
    scene.node.add(arrowHelper);
  };
  const checkBack = () => {
    if (isEnable) {
      // Local coordinates transfrom world coordinates
      const world = new Vector3();
      let parentNode;
      if (parentId) {
        parentNode = core.getNode(parentId);
        if (parentNode && parentNode.node && parentNode.node.isObject3D) {
          parentNode.node.getWorldPosition(world);
        }
      }
      raycaster.ray.origin.copy(world);
      if (helperEnable) {
        if (!arrowHelper) {
          genHelper(raycaster);
        } else {
          if (lockDirection) {
            const quaternion = new Quaternion();
            parentNode.node.getWorldQuaternion(quaternion);
            const vec3 = new Vector3();
            vec3.copy(direction);
            vec3.applyQuaternion(quaternion);
            // vec3.applyQuaternion(parentNode.node.quaternion);
            arrowHelper.setDirection(vec3);
          } else {
            arrowHelper.setDirection(direction);
          }
          arrowHelper.setLength(
            raycaster.far === Infinity ? 20000 : raycaster.far
          );
          arrowHelper.position.copy(raycaster.ray.origin);
        }
      }
      if (sceneId) {
        const childrens = core.getChildrens(sceneId).map((item) => item.node);

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
        const intersects = raycaster.intersectObjects(checkAry, recursive);
        if (intersects.length > 0) {
          let object: Object3D<Event> | null = intersects[0].object;
          if (!checkAry.includes(intersects[0].object as Mesh | Group)) {
            const { userData } = object;
            // check is FBX GLTF ?
            if (userData.primitive && userData.parentId) {
              // is FBX GLTF
              const SD_Node = core.getNode(userData.parentId);
              if (SD_Node && SD_Node.node) {
                object = SD_Node.node;
              }
            }
            raycasterCallback(object, checkAry, intersects);
          } else {
            raycasterCallback(object, checkAry, intersects);
          }
        } else {
          raycasterCallback(null, checkAry, intersects);
        }
      }
    }
  };
  if (renderId) {
    core.dispatchEventById(renderId, {
      type: EventType.Render,
      render: checkBack,
    });
  }
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
  const setOffset = (_offset: Vector3) => {
    offset = _offset;
  };
  const remove = () => {
    if (renderId) {
      core.dispatchEventById(renderId, {
        type: EventType.RemoveRender,
        render: checkBack,
      });
    }
  };
  const setObject = () => {};
  const setHelper = (val: boolean) => {
    helperEnable = val;
  };
  const setLockDirection = (val: boolean) => {
    lockDirection = val;
  };
  return {
    setEnabled,
    updateBack,
    instance: raycaster,
    remove,
    setObject,
    setHelper,
    setOffset,
    setLockDirection,
  };
};
export default useRaycaster;
