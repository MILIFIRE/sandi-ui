import { Scene } from "three"
import type { WebGLRendererWrap } from "@sandi-ui/modules"
import { getCore } from "@sandi-ui/utils"
import { EventType } from '@sandi-ui/enum';
const useScenes = () => {
    const core = getCore()
    //  场景
    const instance = new Scene()
    // mesh 需要获取子集的 几何体 和材质
    const { parentId, id } = core.addNode(instance);
    if (parentId) {
        const parentNode = core.getNode<WebGLRendererWrap>(parentId);
        parentNode.node.setScene(instance)
    }
    core.addEventListenerById(id, EventType.AddObject3d, (Event) => {
        const { object3d } = Event;
        instance.add(object3d)
    })
    // 如果 有父级
    return {
        instance
    }
}
export default useScenes
