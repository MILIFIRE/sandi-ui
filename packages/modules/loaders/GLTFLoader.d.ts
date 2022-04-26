import { AnimationClip, Camera, Group, Loader } from "three";

declare class GLTFLoader extends Loader {
    constructor()
    load(url: string, onLoad: (gltf:{ animations: Array<AnimationClip>, scene: Group, scenes: Array<Group>, cameras: Array<Camera>, asset: Object })=>void, onProgress?:(xhr:XMLHttpRequest)=>void, onError?:(error:Error)=>void): void
}
export  {GLTFLoader}
export default {}
