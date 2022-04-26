import { PerspectiveCamera } from "three"
import type { WebGLRendererWrap } from "@sandi-ui/modules"
import { getCore } from "@sandi-ui/utils"
import { inject } from "vue"
import { EventType } from "@sandi-ui/enum"
import { RENDER_ID } from "@sandi-ui/constants"

const usePerspectiveCamera = (fov: number | undefined, aspect: number | undefined, near: number | undefined, far: number | undefined) => {
    const core = getCore()

    const parentNode = core.getParent<WebGLRendererWrap>();
    if (parentNode && parentNode.node.domElement) {
        const domElement = parentNode.node.domElement
        aspect = domElement.width / domElement.height
    }
    const instance = new PerspectiveCamera(fov, aspect, near, far)
    core.addNode(instance);
    if (parentNode) {
        parentNode.node.setCamera(instance)
    }
    const renderId = inject<number | undefined>(RENDER_ID);
    if (typeof renderId == 'number') {
        core.addEventListenerById(renderId, EventType.RenderSizeChang, (event) => {
            const { width, height } = event;
            instance.aspect = width / height
        })
    }

    return {
        instance
    }
}
export default usePerspectiveCamera
