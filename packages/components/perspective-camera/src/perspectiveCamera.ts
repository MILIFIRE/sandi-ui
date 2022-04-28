import { Object3D, PerspectiveCamera } from "three"
import type { WebGLRendererWrap } from "@sandi-ui/modules"
import { getCore } from "@sandi-ui/utils"
import { inject } from "vue"
import { EventType } from "@sandi-ui/enum"
import { RENDER_ID } from "@sandi-ui/constants"

const usePerspectiveCamera = (fov: number | undefined, aspect: number | undefined, near: number | undefined, far: number | undefined) => {
    const core = getCore()
    let instance = new PerspectiveCamera(fov, aspect, near, far)
    const renderId = inject<number | undefined>(RENDER_ID);
    if (typeof renderId == 'number') {
        const parentNode = core.getParent<Object3D>();
        if (parentNode && parentNode.node.isObject3D) {
            parentNode.node.add(instance)
        }
        core.addNode(instance);
        const renderNode = core.getNode<WebGLRendererWrap>(renderId);
        renderNode.node.setCamera(instance)
        const domElement = renderNode.node.domElement
        instance.aspect = aspect || (domElement.width / domElement.height)
        instance.updateProjectionMatrix()
        core.addEventListenerById(renderId, EventType.RenderSizeChang, (event) => {
            const { width, height } = event;
            instance.aspect = aspect || (width / height)
            instance.updateProjectionMatrix()
        })
    }
    return {
        instance
    }
}
export default usePerspectiveCamera
