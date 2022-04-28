import { inject } from 'vue';
import { Camera, Vector3, Mesh, Raycaster, Scene, Vector2, Clock } from "three"
import type { WebGLRendererWrap } from "@sandi-ui/modules"
import { getCore, getNow, isMesh } from "@sandi-ui/utils"
import { RENDER_ID } from "@sandi-ui/constants"

import { OrbitControls, PointerLockControls } from '@sandi-ui/modules';
const mouse = new Vector2();


//  场景
const usePointerLockControls = (camera: Camera | undefined, domElement: HTMLCanvasElement | undefined) => {
    // init renderNode camera domElement
    const core = getCore()
    let renderId = inject<number | undefined>(RENDER_ID);
    let renderNode;
    if (renderId) {
        renderNode = core.getNode<WebGLRendererWrap>(renderId);
    } else {
        console.warn('usePointerLockControls no found any webglrender')
    }
    if (renderNode) {
        if (!camera) camera = renderNode.node.getCamera() as Camera;
        if (!domElement) domElement = renderNode.node.domElement;
    } else {
        console.warn("not found webglRender, please check use SDwebglRender")
    }
    // about use PointerLockControls logic
    let control;
    let remove;
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;
    let prevTime = getNow();
    const velocity = new Vector3();
    const direction = new Vector3();
    let callBack: any = {};

    // about character behavior
    let gravity = 9.8
    let mass = 1.0
    let moveScale = 10.0
    let movingResistance = 1.0
    let characterHeight = 1.0
    let junpHeight = 1.0


    const execute = (callbackName: string) => {
        if (callBack[callbackName]) {
            callBack[callbackName]()
        } else {
            console.warn(` not found callBack with ${callbackName}`)
        }
    }
    const setCallBack = (key: string, fn: () => void) => {
        callBack[key] = fn;
    }
    const setCharacter = (options: { gravity: number, mass: number, moveScale: number, movingResistance: number, characterHeight: number, junpHeight: number }) => {
        gravity = options.gravity || gravity;
        mass = options.mass || mass;
        moveScale = options.moveScale || moveScale;
        movingResistance = options.movingResistance || movingResistance;
        characterHeight = options.characterHeight || characterHeight;
        junpHeight = options.junpHeight || junpHeight;
    }
    if (camera && domElement) {
        const raycaster = new Raycaster();
        control = new PointerLockControls(camera, domElement);
        const { parentId, id } = core.addNode(control);
        control.addEventListener('lock', function () {
            if (callBack.lock) {
                execute('lock')
            }
        });
        control.addEventListener('unlock', function () {
            setTimeout(() => {
                if (callBack.unlock) {
                    execute('unlock')
                }
            }, 1000)
        });
        const onKeyDown = function (event) {
            event.preventDefault();
            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = true;
                    break;

                case 'Space':
                    if (canJump === true) velocity.y += junpHeight;
                    canJump = false;
                    break;

            }

        };
        const onKeyUp = function (event) {
            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = false;
                    break;

            }

        };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        if (parentId) {
            const raycaster = new Raycaster(new Vector3(), new Vector3(0, - 1, 0), 0, characterHeight);
            const renderFN = (_, time) => {
                if (control.isLocked === true) {
                    // raycaster init
                    raycaster.far = characterHeight;
                    raycaster.ray.origin.copy(control.getObject().position);
                    // raycaster.ray.origin.y -= characterHeight;
                    // find Mesh
                    const childrens = core.getChildrens(parentId)
                    const Meshs = childrens.filter(item => isMesh(item.node)).map(item => item.node) as Mesh[]
                    const intersections = raycaster.intersectObjects(Meshs, false);
                    // feet on Object
                    const onObject = intersections.length > 0;
                    // time diff
                    const delta = (time - prevTime) / 1000;

                    velocity.x -= velocity.x * movingResistance * delta;
                    velocity.z -= velocity.z * movingResistance * delta;

                    velocity.y -= gravity * mass * delta; // 100.0 = mass 9.8 = Gravitational acceleration 2gh

                    direction.z = Number(moveForward) - Number(moveBackward);
                    direction.x = Number(moveRight) - Number(moveLeft);
                    direction.normalize(); // this ensures consistent movements in all directions

                    // if press move keys
                    if (moveForward || moveBackward) velocity.z -= direction.z * moveScale * delta;
                    if (moveLeft || moveRight) velocity.x -= direction.x * moveScale * delta;

                    if (onObject === true) {
                        velocity.y = Math.max(0, velocity.y);
                        canJump = true;
                    }

                    control.moveRight(- velocity.x * delta);
                    control.moveForward(- velocity.z * delta);
                    control.getObject().position.y += (velocity.y * delta);

                    // if not on ground ，camera position Y be characterHeight
                    if (control.getObject().position.y < characterHeight) {
                        velocity.y = 0;
                        control.getObject().position.y = characterHeight;
                        canJump = true;
                    }
                }
                prevTime = time;

            }
            renderNode?.node.setCallBack(renderFN)
        }
        remove = () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }

    } else {
        console.log('not found any camere or domelement')
    }
    return { instance: control, setCallBack, remove, setCharacter }

}
export default usePointerLockControls
