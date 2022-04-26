import { getCore } from "@sandi-ui/utils"

import { Group, Mesh, Object3D, DirectionalLight } from "three"
type Objects = Mesh | Group


const useDsirectionalLight = (color: number | undefined, intensity: number | undefined) => {
    const core = getCore()

    const node = new DirectionalLight(color, intensity);
    node.position.set(1, 1, 1);
    core.addNode(node);
    // mesh 需要获取子集的 几何体 和材质
    const { parentId, id } = core.addNode(node);
    if (parentId) {
        const parentNode = core.getNode<Object3D>(parentId);
        parentNode.node.add(node)
    }


    return { instance: node }
}

// 物体
export default useDsirectionalLight;