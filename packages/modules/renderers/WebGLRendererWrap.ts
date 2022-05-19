import {
  Camera,
  Clock,
  Object3D,
  Vector2,
  WebGLRenderer,
  type WebGLRendererParameters,
} from "three";
import { EventType } from "@sandi-ui/enum";
import type v3dCore from "@sandi-ui/core";
import { getNow } from "@sandi-ui/utils";
import { CSS2DRenderer, CSS3DRenderer } from "@sandi-ui/modules";

export default class WebGLRendererWrap extends WebGLRenderer {
  constructor(parameters?: WebGLRendererParameters | undefined) {
    super(parameters);
  }

  private scene: Object3D | undefined;
  private camera: Camera | undefined;
  private callBack: Array<(delta: number, milliseconds: number) => void> = [];
  private clock: Clock = new Clock();
  private css2DRenderer;
  private css3DRenderer;
  init(id: number, core: v3dCore) {
    core.addEventListenerById(id, EventType.Render, (event) => {
      this.setCallBack(event.render);
    });
    core.addEventListenerById(id, EventType.RemoveRender, (event) => {
      this.delCallBack(event.render);
    });
  }

  setScene(currentObjects: Object3D) {
    this.scene = currentObjects;
  }

  setCamera(currentCamera: Camera) {
    this.camera = currentCamera;
  }
  getScene() {
    return this.scene;
  }
  getCamera() {
    return this.camera;
  }

  setCallBack(fn: (delta: number, milliseconds: number) => void) {
    this.callBack.push(fn);
  }

  delCallBack(fn: (delta: number, milliseconds: number) => void) {
    this.callBack = this.callBack.filter((item) => item != fn);
  }
  enableCss2D(val: boolean, dom?: HTMLElement) {
    if (val && !this.css2DRenderer) {
      const v2 = new Vector2();
      this.getSize(v2);
      this.css2DRenderer = new CSS2DRenderer({ element: dom });
      this.css2DRenderer.setSize(v2.x, v2.y);
      //   this.css2DRenderer.domElement.style.position = "absolute";
      //   this.css2DRenderer.domElement.style.top = "0px";
      //   this.domElement.parentElement?.appendChild(this.css2DRenderer.domElement);
    } else {
      this.domElement.parentElement?.removeChild(this.css2DRenderer.domElement);
      this.css2DRenderer = null;
    }
  }
  enableCss3D(val: boolean, dom?: HTMLElement) {
    if (val && !this.css3DRenderer) {
      const v2 = new Vector2();
      this.getSize(v2);
      this.css3DRenderer = new CSS3DRenderer();
      this.css3DRenderer.setSize(v2.x, v2.y);
      this.domElement.parentElement?.insertBefore(this.css3DRenderer.domElement,this.domElement)
    } else {
      this.domElement.parentElement?.removeChild(this.css3DRenderer.domElement);
      this.css3DRenderer = null;
    }
  }
  setRenderSize(width: number, height: number) {
    this.setSize(width, height);
    if (this.css2DRenderer) {
      this.css2DRenderer.setSize(width, height);
    }
  }

  renderScene() {
    const delta = this.clock.getDelta();
    this.callBack.forEach((item) => {
      try {
        item(delta, getNow());
      } catch (e) {
        console.error("WebGLRendererCallBack:", e);
      }
    });

    if (this.scene && this.camera) {
      this.render(this.scene, this.camera);

      if (this.css2DRenderer) {
        this.css2DRenderer.render(this.scene, this.camera);
      }
      if (this.css3DRenderer) {
        this.css3DRenderer.render(this.scene, this.camera);
      }
    } else {
      console.warn("not found any camera scene");
    }
    requestAnimationFrame(this.renderScene.bind(this));
  }
}
