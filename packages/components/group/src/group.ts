import { getCore } from "@sandi-ui/utils";

import { Group } from "three";
import { EventType, SDEvent } from "@sandi-ui/enum";
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
    core.setEvenet(SDEvent.Click, id, fn);
  };
  const setPointerOver = (fn) => {
    core.setEvenet(SDEvent.PointerOver, id, fn);
  };
  const setPointerOut = (fn) => {
    core.setEvenet(SDEvent.PointerOut, id, fn);
  };
  const remove = () => {
    core.delEvenet(SDEvent.Click, id);
    core.delEvenet(SDEvent.PointerOver, id);
    core.delEvenet(SDEvent.PointerOut, id);
    core.delNode(id);
  };
  return { getInstance, setClick, setPointerOver, setPointerOut, remove };
};

export default useGroup;
