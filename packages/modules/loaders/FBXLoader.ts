import { Loader } from "three";
import type { Object3D } from "three"
declare class FBXLoader extends Loader {
    constructor()
    load(url: string, onLoad: (fbx: Object3D) => void, onProgress?: (xhr: XMLHttpRequest) => void, onError?: (error: Error) => void): void
}
export { FBXLoader }
export default {}
