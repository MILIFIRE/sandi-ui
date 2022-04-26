import { MeshBasicMaterial } from "three"
import { getCore } from "@sandi-ui/utils"
import { EventType } from '@sandi-ui/enum';
//  场景
const useBasicMaterial = (props: any) => {
    const core = getCore()
    const key = props.meshName
    const warpProps = { ...props }
    delete warpProps.meshName
    const instance = new MeshBasicMaterial(warpProps)
    instance.needsUpdate = true;
    // mesh 需要获取子集的 几何体 和材质
    const { parentId, id } = core.addNode(instance);
    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.ChangMaterial, material: instance, key: props.meshName })
    }
    // 如果 有父级
    return {
        instance
    }
}
export default useBasicMaterial
