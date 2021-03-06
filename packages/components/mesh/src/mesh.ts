import { getCore, disposeMesh } from "@sandi-ui/utils";

import {
  Group,
  Mesh,
  Object3D,
  Material,
  BufferGeometry,
  BoxGeometry,
  MeshBasicMaterial,
  CircleGeometry,
  ConeGeometry,
  SphereGeometry,
  PlaneGeometry,
} from "three";
import { EventType, SDEvent } from "@sandi-ui/enum";
const useMesh = (
  geometry: BufferGeometry | undefined,
  material: Material | undefined,
  geometryType: string | undefined,
  geometryParam: any = {}
) => {
  const core = getCore();
  let updateCallback;
  if (!geometry && !geometryType) {
    geometry = new BoxGeometry(1, 1, 1);
  }
  if (!material) {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
  }
  let instance = new Mesh(geometry, material);
  instance.userData.sandiClick = instance.uuid;
  const { parentId, id } = core.addNode(instance);
  const changGeometry = (geometry: BufferGeometry) => {
    if (parentId) {
      const { node: parent } = core.getNode(parentId);
      const {
        material,
        children,
        position: p,
        rotation: r,
        scale: s,
      } = instance as Mesh;
      parent?.remove(instance);
      let olduuid = instance.uuid;
      instance = new Mesh(geometry, material) as Mesh<BufferGeometry, Material>;
      instance.position.set(p.x, p.y, p.z);
      instance.rotation.set(r.x, r.y, r.z);
      instance.scale.set(s.x, s.y, s.z);
      parent?.add(instance);
      children.forEach((object3D) => {
        instance.add(object3D);
      });
      core.setNode(id, instance);
      instance.userData.sandiClick = instance.uuid;
    }
  };
  const ChangMaterial = (material: Material) => {
    instance.material = material;
  };

  core.addEventListenerById(id, EventType.ChangMaterial, (Event) => {
    const { material } = Event;
    ChangMaterial(material);
  });
  core.addEventListenerById(id, EventType.ChangGeometry, (Event) => {
    const { geometry } = Event;
    changGeometry(geometry);
    updateCallback(instance);
  });
  core.addEventListenerById(id, EventType.AddObject3d, (Event) => {
    const { object3d } = Event;
    instance.add(object3d);
  });

  if (parentId) {
    core.dispatchEventById(parentId, {
      type: EventType.AddObject3d,
      object3d: instance,
    });
  }
  // mesh ????????????????????? ????????? ?????????
  const getInstance = () => {
    return instance;
  };

  const update = (fn: (instance: Mesh<BufferGeometry, Material>) => void) => {
    updateCallback = fn;
  };
  const remove = () => {
    core.delNode(id);
    disposeMesh(instance);
  };
  return {
    id,
    getInstance,
    update,
    changGeometry,
    ChangMaterial,
    remove,
  };
};

// ??????
export default useMesh;
