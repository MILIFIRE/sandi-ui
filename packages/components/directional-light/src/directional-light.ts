import { getCore } from "@sandi-ui/utils";

import { Object3D, DirectionalLight } from "three";

const useDsirectionalLight = (
  color: number | undefined,
  intensity: number | undefined
) => {
  const core = getCore();
  const node = new DirectionalLight(color, intensity);
  const { parentId, id } = core.addNode(node);
  if (parentId) {
    const parentNode = core.getNode<Object3D>(parentId);
    parentNode.node.add(node);
  }
  const remove = () => {
    node.dispose();
    core.delNode(id);
  };
  return { instance: node, remove };
};

// 物体
export default useDsirectionalLight;
