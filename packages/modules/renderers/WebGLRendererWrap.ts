import { Camera, Clock, Object3D, WebGLRenderer, type WebGLRendererParameters } from "three";
import { EventType } from "@sandi-ui/enum";
import type v3dCore from '@sandi-ui/core';
import { getNow } from "@sandi-ui/utils"

export default class WebGLRendererWrap extends WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters | undefined) {
        super(parameters)
    }

    private scene: Object3D | undefined
    private camera: Camera | undefined
    private callBack: Array<(delta: number, milliseconds: number) => void> = []
    private clock: Clock = new Clock()

    init(id: number, core: v3dCore) {
        core.addEventListenerById(id, EventType.Render, (event) => {
            this.setCallBack(event.render)
        })
        core.addEventListenerById(id, EventType.RemoveRender, (event) => {
            this.delCallBack(event.render)
        })
    }

    setScene(currentObjects: Object3D) {
        this.scene = currentObjects;
    }

    setCamera(currentCamera: Camera) {
        this.camera = currentCamera
    }

    getCamera() {
        return this.camera
    }

    setCallBack(fn: (delta: number, milliseconds: number) => void) {
        this.callBack.push(fn)
    }

    delCallBack(fn: (delta: number, milliseconds: number) => void) {
        this.callBack = this.callBack.filter(item => item != fn)
    }

    renderScene() {
        const delta = this.clock.getDelta();
        this.callBack.forEach(item => {
            item(delta, getNow())
        })
        if (this.scene && this.camera) {
            this.render(this.scene, this.camera)
        } else {
            console.warn("未检测到场景或者摄像机")
        }
        requestAnimationFrame(this.renderScene.bind(this))
    }
}
