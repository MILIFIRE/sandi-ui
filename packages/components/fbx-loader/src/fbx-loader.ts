import { getCore } from "@sandi-ui/utils";

import type { Material, Object3D, SkinnedMesh, Mesh, Bone, Group } from "three";
import { FBXLoader } from "@sandi-ui/modules";
import { EventType } from "@sandi-ui/enum";
import { deepDispose } from "@sandi-ui/utils";

const useFBXLoader = (url: string) => {
  const core = getCore();
  let materialMap = new Map<string, Material>();
  let meshMap = new Map<string, Mesh>();
  let object: Object3D | null = null;
  const { parentId, id } = core.addNode({ isFBX: true, isload: false });
  const parentNode = core.getParent<Object3D>();
  const setMaterial = (
    objects: Object3D[],
    material: Material,
    key: string
  ) => {
    const mesh = objects.find((item) => {
      if (item.type == "SkinnedMesh" && item.name == key) return item;
    }) as SkinnedMesh;
    if (mesh) {
      mesh.material = material;
    }
  };
  const findBone = (bones: Bone[], key: string) => {
    let steak = [...bones];
    while (steak.length != 0) {
      const bone = steak.pop();
      if (bone?.name == key) {
        return bone;
      }
      if (bone?.children) {
        bone.children.forEach((item) => {
          if (item.type === "Bone") {
            steak.push(item as Bone);
          }
        });
      }
    }
    return null;
  };
  const setMesh = (bones: Bone[], mesh: Mesh, key: string) => {
    let _bone = findBone(bones, key);
    _bone?.add(mesh);
  };
  const removeMesh = (bones: Bone[], mesh: Mesh, key: string) => {
    let _bone = findBone(bones, key);
    _bone?.remove(mesh);
  };
  core.addEventListenerById(id, EventType.ChangMaterial, (event) => {
    const { material, key } = event;
    if (key && material) {
      materialMap.set(key, material);
      if (object) {
        setMaterial(object.children, material, key);
      }
    }
  });
  core.addEventListenerById(id, EventType.ChangMesh, (event) => {
    const { mesh, key } = event;
    if (key && mesh) {
      meshMap.set(key, mesh);
      if (object) {
        setMesh(
          object.children.filter((item) => item.type == "Bone") as Bone[],
          mesh,
          key
        );
      }
    }
  });
  const instance = new FBXLoader();

  instance.load(url, (object3d) => {
    if (parentNode) {
      object = object3d;
      // add fbx Models
      parentNode.node.add(object3d);
      if (parentNode.node.isObject3D) {
        object3d.traverse((object) => {
          object.userData = {
            primitive: true,
            parentId: parentNode.id,
          };
        });
      }
      // async set animation
      core.dispatchEventById(id, {
        type: EventType.AnimationsReady,
        payload: { object3d, animations: object3d.animations },
      });
      // reset node for core
      core.setNode(id, { isFBX: true, object3d, isload: true });
      if (materialMap.size !== 0) {
        materialMap.forEach((material, key) => {
          setMaterial(object3d.children, material, key);
        });
      }
    }
  });
  const remove = () => {
    core.delNode(id);
    if (object)
      object.children.forEach((Object3D) => {
        deepDispose(Object3D);
      });
  };
  return {
    instance,
    remove,
  };
};
export default useFBXLoader;
