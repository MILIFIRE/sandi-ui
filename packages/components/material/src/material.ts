import { getCore } from "@sandi-ui/utils"

import { EventType } from '@sandi-ui/enum';
import type { Material } from "three";
const useMaterial = (material: Material, meshName: string | undefined) => {
    const core = getCore();
    const { parentId, id } = core.addNode(material)
    if (parentId) core.dispatchEventById(parentId, { type: EventType.ChangMaterial, material, key: meshName })
    const changMaterial = (material?: Material,) => {
        if (parentId) core.dispatchEventById(parentId, { type: EventType.ChangMaterial, material, key: meshName })
    }
    const remove = () => {
        material.dispose()
        core.delNode(id)
    }
    return { changMaterial, remove }
}
export default useMaterial;