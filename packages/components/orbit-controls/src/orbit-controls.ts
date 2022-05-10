import { OrbitControls } from "@sandi-ui/modules";
import { inject, nextTick } from "vue";
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
  if (!camera && !domElement) {
    if (renderId) {
      renderNode = core.getNode<WebGLRendererWrap>(renderId);
      camera = renderNode.node.getCamera() as Camera;
      domElement = renderNode.node.domElement.parentElement;
    }
  }

  if (camera && domElement) {
    instance = new OrbitControls(camera, domElement);
    const { parentId, id } = core.addNode(instance);
  } else {
      //   To optimize the
    nextTick(() => {
      instance = new OrbitControls(
        renderNode.node.getCamera(),
        renderNode.node.domElement.parentElement
      );
    });
    // console.error("not found any camera in OrbitControls");
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
