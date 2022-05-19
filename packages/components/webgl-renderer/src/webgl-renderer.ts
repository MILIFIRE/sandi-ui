import type { WebGLRendererParameters, Camera, Scene } from "three";
import { WebGLRendererWrap } from "@sandi-ui/modules";
import { nextTick, watch, type PropType } from "vue";
import { getCore } from "@sandi-ui/utils";
import { EventType } from "@sandi-ui/enum";
import useEvent from "./event";

export const webglProps = {
  camera: {
    type: Object as PropType<Camera>,
    required: false,
    default: null,
  },
  scene: {
    type: Object as PropType<Scene>,
    required: false,
    default: null,
  },
  options: {
    type: Object as PropType<WebGLRendererParameters>,
    required: false,
  },
  width: {
    type: Number,
    required: true,
    default: 1000,
  },
  height: {
    type: Number,
    required: true,
    default: 1000,
  },
  pixelRatio: {
    type: Number,
    required: false,
    default: window.devicePixelRatio,
  },
  backgroundColor: {
    type: Number,
    required: false,
    default: 0x000000,
  },
  backgroundAlpha: {
    type: Number,
    required: false,
    default: 1,
  },
  renderCallback: {
    type: Function as PropType<(delta: number) => void>,
    required: false,
  },
  enableEvent: {
    type: Boolean,
    required: false,
    default: true,
  },
  css2D:{
    type: Boolean,
    required: false,
    default: false,
  },
  css3D:{
    type: Boolean,
    required: false,
    default: false,
  }
  
};

export const useRender = (parameters?: WebGLRendererParameters | undefined) => {
  let removeEvent;
  const core = getCore();
  const instance = new WebGLRendererWrap(parameters);
  core.addNode(instance);
  const { id } = core.getParentAndId();
  instance.init(id, core);
  const setSize = (width: number, height: number) => {
    instance.setRenderSize(width, height);
    nextTick(() => {
      core.dispatchEventById(id, {
        type: EventType.RenderSizeChang,
        width,
        height,
      });
    });
  };
  const setEvent = (val: boolean) => {
    if (val) {
      if (!removeEvent) {
        const { remove } = useEvent(instance);
        removeEvent = remove;
      }
    } else {
      if (removeEvent && typeof removeEvent === "function") {
        removeEvent();
        removeEvent = null;
      }
    }
  };
  return {
    instance,
    setSize,
    setEvent,
  };
};
