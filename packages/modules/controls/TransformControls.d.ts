import { Camera, Object3D, Raycaster, Vector3 } from "three";
type radians = number;
declare enum TransformMode {
    translate="translate"
}
declare class TransformControls extends Object3D{

    constructor(camera:Camera,id:number,core:HTMLElement,renderNode)
    axis:string;
    camera:Camera;
    domElement:HTMLElement;
    dragging:boolean;
    enabled:boolean;
    mode:TransformMode;
    object:Object3D;
    rotationSnap:Number;
    showX:boolean;
    showY:boolean;
    showZ:boolean;
    size:number;
    space:string;
    transkationsSnap:number
    detach():TransformControls;
    dispose():undefined;
    getRaycaster():Raycaster;
    getMode():TransformMode;
    setMode(mode:string):undefined;
    setRotationSnap ( rotationSnap : number ) : undefined;
    setScaleSnap( scaleSnap : number ) :undefined;
    setSize( size : number ) :undefined;
    setSpace( space : string ) :undefined;
    setTranslationSnap( translationSnap : number ) :undefined;
    reset():undefined;
}
export {TransformControls}
export default {}
