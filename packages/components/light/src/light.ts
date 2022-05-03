import { getCore } from "@sandi-ui/utils";

import { EventType } from "@sandi-ui/enum";
import type { Light, Material, Object3D } from "three";
const useLight = (light: Light) => {
  const core = getCore();
  const { parentId, id } = core.addNode(light);
  let parentNode;
  if (parentId) {
    parentNode = core.getNode<Object3D>(parentId);
    parentNode.node.add(light);
  }
  const changLight = (newlight: Light) => {
    light.children.forEach((node) => {
      newlight.add(node);
    });
    parentNode.node.remove(light);
    newlight.position.copy(light.position);
    newlight.rotation.copy(light.rotation);
    newlight.scale.copy(light.scale);
    light = newlight;
    parentNode.node.add(light);
  };
  const remove = () => {
    light.dispose();
    core.delNode(id);
  };
  return { changLight, remove };
};
export default useLight;
