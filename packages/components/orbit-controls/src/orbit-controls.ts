import { OrbitControls } from "@sandi-ui/modules";
import { inject } from "vue";
import type { Camera } from "three";
import type { WebGLRendererWrap } from "@sandi-ui/modules";
import { getCore } from "@sandi-ui/utils";
import { RENDER_ID } from "@sandi-ui/constants";
import { EventType } from "@sandi-ui/enum";

//  场景
const useOrbitControls = (
  camera: Camera | undefined,
  domElement: HTMLCanvasElement | undefined
) => {
  const core = getCore();
  let instance;
  let needUpdate = false;
  const renderId = inject<number | undefined>(RENDER_ID);
  if (!camera && !domElement) {
    if (renderId) {
      const renderNode = core.getNode<WebGLRendererWrap>(renderId);
      camera = renderNode.node.getCamera() as Camera;
      domElement = renderNode.node.domElement;
    }
  }
  if (camera && domElement) {
    const control = new OrbitControls(camera, domElement);
    instance = control;
    const { parentId, id } = core.addNode(control);
  } else {
    console.error("not found any camera in OrbitControls");
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
