import { MeshLambertMaterial } from "three"
import { getCore, disposeMaterial } from "@sandi-ui/utils"
import { EventType } from '@sandi-ui/enum';
//  场景
const useLambertMaterial = (props: any) => {
    const core = getCore()
    const key = props.meshName
    const warpProps = { ...props }
    delete warpProps.meshName
    const instance = new MeshLambertMaterial(warpProps)
    instance.needsUpdate = true;
    const { parentId, id } = core.addNode(instance);
    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.ChangMaterial, material: instance, key: props.meshName })
    }
    const remove = () => {
        disposeMaterial(instance)
    }
    return {
        remove,
        instance
    }
}
export default useLambertMaterial
