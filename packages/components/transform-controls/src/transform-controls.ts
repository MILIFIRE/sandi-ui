import { inject, getCurrentInstance } from "vue";
import { Camera, MathUtils, Mesh, Raycaster, Scene, Vector2 } from "three";
import type { WebGLRendererWrap } from "@sandi-ui/modules";
import { getCore, isMesh, isOrbit } from "@sandi-ui/utils";
import { RENDER_ID } from "@sandi-ui/constants";

import { OrbitControls, TransformControls } from "@sandi-ui/modules";
import { EventType, SDEvent } from "@sandi-ui/enum";
const mouse = new Vector2();

const useTransformControls = (
  camera: Camera | undefined,
  domElement: HTMLCanvasElement | undefined
) => {
  const core = getCore();
  let renderId: number | undefined;
  let windowSize: { width: number; height: number };
  let control: TransformControls;
  let remove;
  let renderNode;

  if (!camera && !domElement) {
    renderId = inject<number | undefined>(RENDER_ID);

    if (renderId) {
      core.addEventListenerById(
        renderId,
        EventType.RenderSizeChang,
        (event) => {
          const { width, height } = event;
          windowSize = { width, height };
        }
      );
      renderNode = core.getNode<WebGLRendererWrap>(renderId);
      camera = renderNode.node.getCamera() as Camera;
      domElement = renderNode.node.domElement;
    }
  }
  if (camera && domElement) {
    const vnode = getCurrentInstance();
    control = new TransformControls(camera, vnode?.uid as number, core,renderNode);
    const { parentId, id } = core.addNode(control);
    if (parentId) {
      const parentNode = core.getNode<Scene>(parentId);
      parentNode.node.add(control);
      const raycaster = new Raycaster();
      const onClick = (event: MouseEvent, sdEvent) => {
        const { target, intersects } = sdEvent;
        if (intersects.length>0) {
          control.attach(intersects[0].object);
        } else {
          control.detach();
        }
      };
      const draggingChanged = (event) => {
        if (renderId) {
          const renderNode = core.getNode<WebGLRendererWrap>(renderId);
          if (renderNode.children) {
            const childrenNode = renderNode.children.map((item) =>
              core.getNode(item)
            );
            const orbit = childrenNode.find((item) => isOrbit(item.node));
            if (orbit) {
              orbit.node.enabled = !event.value;
            }
          }
        }
      };
      const keydown = (event) => {
        switch (event.code) {
          case "KeyQ": // Q
            control.setSpace(control.space === "local" ? "world" : "local");
            break;
          case "KeyW": // W
            control.setMode("translate");
            break;
          case "KeyE": // E
            control.setMode("rotate");
            break;
          case "KeyR": // R
            control.setMode("scale");
            break;
          case "Equal": // +, =, num+
            control.setSize(control.size + 0.1);
            break;
          case "Minus": // -, _, num-
            control.setSize(Math.max(control.size - 0.1, 0.1));
            break;
          case "Escape": // Esc
            control.reset();
            break;
        }
      };
      //   domElement.addEventListener("click", onClick);
      core.setEvenet(("gl" + SDEvent.onClick) as SDEvent, id, onClick);

      control.addEventListener("dragging-changed", draggingChanged);
      //todo
      //   document.addEventListener("keydown", keydown, false);
      core.setEvenet(("gl" + SDEvent.onKeyDown) as SDEvent, id, keydown);
      remove = () => {
        core.delEvenet("gl" + SDEvent.onKeyDown, id);
        core.delEvenet("gl" + SDEvent.onClick, id);
        control?.removeEventListener("dragging-changed", draggingChanged);
        control?.dispose();
      };
    }
    return { instance: control, remove };
  } else {
    console.warn("not found any camera render");
  }
  return { instance: undefined, remove };
};
export default useTransformControls;
