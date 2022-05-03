import { getCore } from "@sandi-ui/utils"

import { Group, Mesh, Object3D, PointLight } from "three"
type Objects = Mesh | Group


const usePointLight = (color: number | undefined, intensity: number | undefined, distance: number | undefined, decay: number | undefined) => {
    const core = getCore()

    const node = new PointLight(color, intensity, distance, decay);
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
export default usePointLight;