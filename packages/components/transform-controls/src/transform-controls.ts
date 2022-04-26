import { inject } from 'vue';
import { Camera, MathUtils, Mesh, Raycaster, Scene, Vector2 } from "three"
import type { WebGLRendererWrap } from "@sandi-ui/modules"
import { getCore } from "@sandi-ui/utils"
import { RENDER_ID } from "@sandi-ui/constants"

import { OrbitControls, TransformControls } from '@sandi-ui/modules';
import { EventType } from '@sandi-ui/enum';
const mouse = new Vector2();

const isMesh = (object: any) => {
    if (object.isMesh) {
        return true
    } else {
        false
    }
}
const isOrbit = (object: any) => {
    if (object instanceof OrbitControls) {
        return true
    } else {
        false
    }
}
//  场景
const useTransformControls = (camera: Camera | undefined, domElement: HTMLCanvasElement | undefined) => {
    const core = getCore()
    let renderId: number | undefined;
    let windowSize: { width: number, height: number };
    if (!camera && !domElement) {
        renderId = inject<number | undefined>(RENDER_ID);

        if (renderId) {
            core.addEventListenerById(renderId, EventType.RenderSizeChang, (event) => {
                const { width, height } = event;
                windowSize = { width, height };
            })
            const renderNode = core.getNode<WebGLRendererWrap>(renderId);
            camera = renderNode.node.getCamera() as Camera;
            domElement = renderNode.node.domElement;
        }
    }
    if (camera && domElement) {
        let control: TransformControls;
        control = new TransformControls(camera, domElement);
        const { parentId, id } = core.addNode(control);
        if (parentId) {
            const parentNode = core.getNode<Scene>(parentId);
            parentNode.node.add(control)
            const raycaster = new Raycaster();
            const onClick = (event: MouseEvent) => {
                if (windowSize) {
                    event.preventDefault();
                    mouse.x = (event.offsetX / windowSize.width) * 2 - 1;
                    mouse.y = - (event.offsetY / windowSize.height) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera as Camera);
                    const childrens = core.getChildrens(parentId)
                    const Meshs = childrens.filter(item => isMesh(item.node)).map(item => item.node) as Mesh[]
                    const intersections = raycaster.intersectObjects(Meshs, true);
                    console.log('Meshs:', Meshs)
                    console.log('intersections:', intersections)
                    if (intersections.length > 0) {

                        const findeObject = intersections[0].object;
                        control.attach(findeObject)

                    } else {
                        control.detach()

                    }
                } else {
                    console.warn('unknow window size')
                }

            }
            domElement.addEventListener('click', onClick);
        }
        control.addEventListener('dragging-changed', (event) => {
            if (renderId) {
                const renderNode = core.getNode<WebGLRendererWrap>(renderId);
                if (renderNode.children) {
                    const childrenNode = renderNode.children.map(item => core.getNode(item))
                    const orbit = childrenNode.find(item => isOrbit(item.node))
                    if (orbit) {
                        orbit.node.enabled = !event.value;
                    }

                }

            }
        });
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            console.log('domElement:', domElement)
            switch (event.code) {

                case 'KeyQ': // Q
                    control.setSpace(control.space === 'local' ? 'world' : 'local');
                    break;



                case 'KeyW': // W

                    control.setMode('translate');
                    break;

                case 'KeyE': // E

                    control.setMode('rotate');
                    break;

                case 'KeyR': // R
                    control.setMode('scale');
                    break;

                // case 67: // C
                //     const position = currentCamera.position.clone();

                //     currentCamera = currentCamera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
                //     currentCamera.position.copy( position );

                //     orbit.object = currentCamera;
                //     control.camera = currentCamera;

                //     currentCamera.lookAt( orbit.target.x, orbit.target.y, orbit.target.z );
                //     onWindowResize();
                //     break;

                // case 86: // V
                //     const randomFoV = Math.random() + 0.1;
                //     const randomZoom = Math.random() + 0.1;

                //     cameraPersp.fov = randomFoV * 160;
                //     cameraOrtho.bottom = - randomFoV * 500;
                //     cameraOrtho.top = randomFoV * 500;

                //     cameraPersp.zoom = randomZoom * 5;
                //     cameraOrtho.zoom = randomZoom * 5;
                //     onWindowResize();
                //     break;

                // case 187:
                // case 107: // +, =, num+
                //     control.setSize( control.size + 0.1 );
                //     break;

                // case 189:
                // case 109: // -, _, num-
                //     control.setSize( Math.max( control.size - 0.1, 0.1 ) );
                //     break;

                // case 88: // X
                //     control.showX = ! control.showX;
                //     break;

                // case 89: // Y
                //     control.showY = ! control.showY;
                //     break;

                // case 90: // Z
                //     control.showZ = ! control.showZ;
                //     break;

                // case 32: // Spacebar
                //     control.enabled = ! control.enabled;
                //     break;

                // case 27: // Esc
                //     control.reset();
                //     break;

            }

        }, false);


        return { instance: control }
    } else {
        console.log('未找到摄像机 或  dom 元素')
        return { instance: undefined }
    }
}
export default useTransformControls
