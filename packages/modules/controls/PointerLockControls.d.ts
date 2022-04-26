import { Camera, EventDispatcher, Vector3 } from "three";

declare class PointerLockControls extends EventDispatcher {
    constructor(camera: Camera, domElement: HTMLElement)
    isLocked: boolean;
    camera: Camera;
    domElement: HTMLElement;
    minPolarAngle: number;
    pointerSpeed: number;
    getObject(): Camera;
    getDirection(): (v: Vector3) => Vector3;
    moveForward(number): void;
    moveRight(number): void;
    lock(): void;
    unlock(): void;
}
export { PointerLockControls }
export default {}
