import { OrbitControls } from "@sandi-ui/modules";
import { getCurrentInstance, inject, nextTick } from "vue";
import type { Camera } from "three";
import type { WebGLRendererWrap } from "@sandi-ui/modules";
import { getCore } from "@sandi-ui/utils";
import { RENDER_ID } from "@sandi-ui/constants";
import { EventType } from "@sandi-ui/enum";

//  场景
const useOrbitControls = (
  camera: Camera | undefined,
  domElement: HTMLElement | null
) => {
  const core = getCore();
  let instance;
  let needUpdate = false;
  const renderId = inject<number | undefined>(RENDER_ID);
  let renderNode;
  const vnode = getCurrentInstance();

  if (!camera) {
    if (renderId) {
      renderNode = core.getNode<WebGLRendererWrap>(renderId);
      camera = renderNode.node.getCamera() as Camera;
    }
  }

  if (camera) {
    instance = new OrbitControls(camera, vnode?.uid as number, core, renderNode);
    const { parentId, id } = core.addNode(instance);
  }
  if (renderId) {
    core.dispatchEventById(renderId, {
      type: EventType.Render,
      render: () => {
        if (needUpdate) {
          instance.update();
        }
      },
    });
  }
  const remove = () => {
    if (instance) {
      instance.dispose();
    }
  };
  const setUpdate = (val: boolean) => {
    needUpdate = val;
  };
  return { instance, remove, setUpdate };
};
export default useOrbitControls;
