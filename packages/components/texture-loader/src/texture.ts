import { getCore } from "@sandi-ui/utils"

import { TextureLoader, Material } from "three"
import type { Texture } from "three"
export const useTexture = () => {
    const core = getCore()
    const instance = new TextureLoader()
    const { parentId, id } = core.addNode(instance);
    const setTexture = (texture: Texture | null, texureType: string) => {
        if (parentId) {
            const parentNode = core.getNode<Material>(parentId);
            const node = parentNode.node;
            if (node instanceof Material) {
                (parentNode.node as any)[texureType] = texture
            } else {
                console.warn(`parent node dont have ${texureType}`)
            }
        }
    }
    return {
        instance,
        setTexture,
        loadAsync: instance.loadAsync.bind(instance)
    }
}
export default { useTexture }