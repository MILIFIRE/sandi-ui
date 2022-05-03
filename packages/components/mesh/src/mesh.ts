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
import { EventType, SDMouseEvent } from "@sandi-ui/enum";
const useMesh = (
  geometry: BufferGeometry | undefined,
  material: Material | undefined,
  geometryType: string | undefined,
  geometryParam: any = {},
  click: (() => void) | undefined
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
  // mesh 需要获取子集的 几何体 和材质
  const getInstance = () => {
    return instance;
  };

  const update = (fn: (instance: Mesh<BufferGeometry, Material>) => void) => {
    updateCallback = fn;
  };

  const setClick = (fn) => {
    core.setEvenet(SDMouseEvent.Click, id, fn);
  };
  const setPointerOver = (fn) => {
    core.setEvenet(SDMouseEvent.PointerOver, id, fn);
  };
  const setPointerOut = (fn) => {
    core.setEvenet(SDMouseEvent.PointerOut, id, fn);
  };
  const remove = () => {
    core.delEvenet(SDMouseEvent.Click, id);
    core.delEvenet(SDMouseEvent.PointerOver, id);
    core.delEvenet(SDMouseEvent.PointerOut, id);
    core.delNode(id);
    disposeMesh(instance);
  };
  return {
    getInstance,
    update,
    changGeometry,
    ChangMaterial,
    setClick,
    setPointerOver,
    setPointerOut,
    remove,
  };
};

// 物体
export default useMesh;
