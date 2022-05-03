import { getCore } from "@sandi-ui/utils";

import type { Group, Object3D } from "three";
import { GLTFLoader } from "@sandi-ui/modules";
import { EventType } from "@sandi-ui/enum";
import { deepDispose, disposeMesh } from "@sandi-ui/utils";

const useGLTFloader = (url: string) => {
  const core = getCore();

  const instance = new GLTFLoader();
  const { parentId, id } = core.addNode({ isGLTF: true, isload: false });
  const parentNode = core.getParent<Object3D>();
  let gltfObjects;
  instance.load(url, (gltf) => {
    const { scene } = gltf;
    if (parentNode) {
      // 挂在场景
      parentNode.node.add(scene);
      if (parentNode.node.isObject3D) {
        scene.traverse((object) => {
          object.userData = {
            primitive: true,
            parentId: parentNode.id,
          };
        });
      }
      // 回调函数 用于自己子节点的设置 加载时间 过长
      core.dispatchEventById(id, {
        type: EventType.AnimationsReady,
        payload: { object3d: gltf.scene, animations: gltf.animations },
      });
      // 重新设置节点
      core.setNode(id, { isGLTF: true, gltf, isload: true });
      gltfObjects = gltf;
    }
  });
  const remove = () => {
    core.delNode(id);
    if (gltfObjects) {
      // gltfObjects.scene.children.forEach(item => deepDispose(item))
      gltfObjects.scenes.forEach((scene) => {
        scene.children.forEach((item) => deepDispose(item));
      });
      gltfObjects.cameras.forEach((camera) => camera.dispose());
    }
  };
  return {
    instance,
    remove,
  };
};
export default useGLTFloader;
