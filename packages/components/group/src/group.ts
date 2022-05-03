import { getCore } from "@sandi-ui/utils";

import { Group } from "three";
import { EventType, SDMouseEvent } from "@sandi-ui/enum";
const useGroup = (click: (() => void) | undefined) => {
  const core = getCore();

  let instance = new Group();
  instance.userData.sandiClick = instance.uuid;

  const { parentId, id } = core.addNode(instance);

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
  const getInstance = () => {
    return instance;
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
  };
  return { getInstance, setClick, setPointerOver, setPointerOut, remove };
};

export default useGroup;
