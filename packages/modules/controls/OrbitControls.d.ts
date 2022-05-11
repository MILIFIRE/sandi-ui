import { Camera, Vector3 } from "three";
type radians = number;
declare class OrbitControls {
    autoRotate:boolean;
    autoRotateSpeed:number;
    dampingFactor :number;
    domElement:HTMLElement;
    enabled :boolean;
    enableDamping :boolean;
    enablePan :boolean;
    enableRotate :boolean;
    enableZoom :boolean;
    keyPanSpeed :number;
    keys :any;
    maxAzimuthAngle :number;
    maxDistance :number;
    maxPolarAngle :number;
    maxZoom :number;
    minAzimuthAngle :number;
    minDistance :number;
    minPolarAngle :number;
    minZoom :number;
    mouseButtons :any;
    object :Camera;
    panSpeed:number;
    position0:Vector3;
    rotateSpeed:number;
    screenSpacePanning:boolean;
    target0:Vector3;
    target:Vector3;
    touches:any;
    zoom0:number;
    zoomSpeed:number;
    constructor( object : Camera,id:number, core : HTMLElement,renderNode );
    dispose():void;
    getAzimuthalAngle():radians;
    getPolarAngle():radians;
    getDistance():number;
    listenToKeyEvents(domElement:HTMLElement):void;
    reset():void;
    saveState():void;
    update():void
}
export  {OrbitControls}
export default {}
