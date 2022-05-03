import { getCore } from "@sandi-ui/utils"

import { Group, Mesh, Object3D, SpotLight } from "three"

const useSpotLight = (color: number | undefined, intensity: number | undefined, distance: number | undefined, angle: number | undefined, penumbra: number | undefined, decay: number | undefined) => {
    const core = getCore()

    const node = new SpotLight(color, intensity, distance, angle, penumbra, decay);
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
export default useSpotLight;