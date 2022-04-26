import { OrbitControls } from '@sandi-ui/modules';
import { inject } from 'vue';
import type { Camera } from "three"
import type { WebGLRendererWrap } from "@sandi-ui/modules"
import { getCore } from '@sandi-ui/utils';
import { RENDER_ID } from "@sandi-ui/constants"

//  场景
const useOrbitControls = (camera: Camera | undefined, domElement: HTMLCanvasElement | undefined) => {
    const core = getCore();
    if (!camera && !domElement) {
        const renderId = inject<number | undefined>(RENDER_ID);
        if (renderId) {
            const renderNode = core.getNode<WebGLRendererWrap>(renderId);
            camera = renderNode.node.getCamera() as Camera;
            domElement = renderNode.node.domElement;
        }
    }
    if (camera && domElement) {
        const control = new OrbitControls(camera, domElement);
        const { parentId, id } = core.addNode(control);

        control.minDistance = 0;
        control.maxDistance = 2000;

        return { instance: control }
    } else {
        console.log('未找到摄像机 或  dom 元素')
        return { instance: undefined }
    }
}
export default useOrbitControls
