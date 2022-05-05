import {
  BufferGeometry,
  Camera,
  Group,
  Material,
  Object3D,
  Raycaster,
  Vector2,
} from "three";
import type { Mesh, Intersection, Event } from "three";
import { filterV3dNode, getCore } from "@sandi-ui/utils";
import { SDEvent, V3dNodeCheck } from "@sandi-ui/enum";
import type { WebGLRendererWrap } from "@sandi-ui/modules";

const useEvent = (renderNode: WebGLRendererWrap) => {
  const core = getCore();
  let recursive = true;
  let domElement = renderNode.domElement;
  const instance = new Raycaster();
  const mouse = new Vector2();
  let inCavans = false;
  interface SDEventOrign {
    target: Mesh<BufferGeometry, Material | Material[]> | Group | null;
    objects: (Mesh<BufferGeometry, Material | Material[]> | Group)[];
    intersects: Intersection<Object3D<Event>>[];
    type: SDEvent;
    domEvent: MouseEvent | KeyboardEvent | null;
  }
  const SD_Event: SDEventOrign = {
    target: null,
    objects: [],
    intersects: [],
    type: SDEvent.None,
    domEvent: null,
  };
  let prevId = -1;
  const pointOver = (id) => {
    const PointerOvercallBackFn = core.getEvenet(SDEvent.onPointerOver, id);

    if (typeof PointerOvercallBackFn === "function") {
      const node = core.getNode(id);
      PointerOvercallBackFn(node);
    }
  };
  const pointOut = (id) => {
    const PointerOutcallBackFn = core.getEvenet(SDEvent.onPointerOut, id);
    if (typeof PointerOutcallBackFn === "function") {
      const node = core.getNode(id);
      PointerOutcallBackFn(node);
    }
  };
  const pointOverAndOut = () => {
    const { target, objects, intersects, type } = SD_Event;
    if (intersects.length > 0) {
      const object = intersects[0].object;
      const { userData } = object;
      // check is FBX GLTF
      if (userData.primitive && userData.parentId) {
        // is out model
        if (prevId !== userData.parentId) {
          pointOver(userData.parentId);
          if (prevId !== -1) {
            pointOut(prevId);
          }
          prevId = userData.parentId;
        }
      } else {
        const v3dNode = core.getNodeWithObject(object);
        if (prevId !== v3dNode.id) {
          pointOver(v3dNode.id);
          if (prevId !== -1) {
            pointOut(prevId);
          }
          prevId = v3dNode.id;
        }
      }
    } else {
      if (prevId != -1) {
        pointOut(prevId);
        prevId = -1;
      }
    }
  };
  const scan = () => {
    const scan = renderNode.getScene();
    let sceneId;
    if (scan) {
      sceneId = core.getNodeWithObject(scan);
    }
    if (sceneId && sceneId.id) {
      const childrens = core.getChildrens(sceneId.id).map((item) => item.node);
      const checkAry = filterV3dNode(
        childrens,
        [
          V3dNodeCheck.isMesh,
          V3dNodeCheck.isGroup,
          V3dNodeCheck.isFBX,
          V3dNodeCheck.isGLTF,
        ],
        true
      );
      const intersects = instance.intersectObjects(checkAry, recursive);
      SD_Event.objects = checkAry;
      SD_Event.intersects = intersects;
      pointOverAndOut();
    }
  };

  const updateMouse = (event: MouseEvent | PointerEvent) => {
    event.preventDefault();
    const size = new Vector2();
    renderNode.getSize(size);
    mouse.x = (event.offsetX / size.x) * 2 - 1;
    mouse.y = -(event.offsetY / size.y) * 2 + 1;
    instance.setFromCamera(mouse, renderNode.getCamera() as Camera);
  };

  const handleEvent = (event) => {
    // event.preventDefault();
    // is KeyboardEvent ?
    if (event instanceof MouseEvent && event instanceof PointerEvent) {
      // update mouse pointer
      updateMouse(event);
    }
    // contronl keybordEvent
    if (event.type == SDEvent.onPointerOut) {
      inCavans = false;
      return;
    }
    if (event.type === SDEvent.onPointerOver) {
      inCavans = true;
      return;
    }

    if (event instanceof KeyboardEvent && inCavans === false) {
      return;
    }

    SD_Event.type = event.type as SDEvent;
    if (SD_Event.intersects.length > 0) {
      const { target, objects, intersects, type } = SD_Event;

      let object: Object3D<Event> | null = intersects[0].object;
      let stopBubbling = false;
      //  bubbling
      while (!stopBubbling && object) {
        let SD_Node;
        const { userData } = object;
        // check is FBX GLTF ?
        if (userData.primitive && userData.parentId) {
          // is FBX GLTF
          SD_Node = core.getNode(userData.parentId);
        } else {
          // normal node
          SD_Node = core.getNodeWithObject(object);
        }
        // SD_Node not found in Core Map
        if (SD_Node) {
          // get callBackFn
          const callBackFn = core.getEvenet(type, SD_Node.id);
          if (typeof callBackFn === "function") {
            // stopBubbling
            if (callBackFn(event, SD_Event) === false) {
              stopBubbling = true;
            }
          }
          object = SD_Node.node.parent;
        } else {
          object = object.parent;
        }
      }
    } else {
      // triger PointerMissed
      if (event instanceof KeyboardEvent) {
        const callBackFnAry = core.getEventWithType(SDEvent.onKeyMissed);
        callBackFnAry.forEach((callBackFn) => {
          if (typeof callBackFn === "function") callBackFn(event, SD_Event);
        });
      }
      if (event instanceof PointerEvent) {
        const callBackFnAry = core.getEventWithType(SDEvent.onPointerMissed);
        callBackFnAry.forEach((callBackFn) => {
          if (typeof callBackFn === "function") callBackFn(event, SD_Event);
        });
      }
      prevId = -1;
    }
  };

  renderNode.setCallBack(scan);
  const eventList = [
    SDEvent.onClick,
    SDEvent.onPointerMove,
    SDEvent.onPointerOut,
    SDEvent.onPointerOver,
    SDEvent.onPointerDown,
    SDEvent.onPointerUp,
    SDEvent.onWheel,
    SDEvent.onDblClick,
    SDEvent.onContextmenu,
  ];
  const Keyevent = [SDEvent.onKeyDown, SDEvent.onKeyup, SDEvent.onKeypress];
  Keyevent.forEach((event) => {
    document.addEventListener(event, handleEvent);
  });
  eventList.forEach((event) => {
    domElement?.parentElement?.addEventListener(event, handleEvent);
  });
  const remove = () => {
    eventList.forEach((event) => {
      domElement?.parentElement?.removeEventListener(event, handleEvent);
    });
    Keyevent.forEach((event) => {
      document.removeEventListener(event, handleEvent);
    });
    renderNode.delCallBack(scan);
  };

  return {
    remove,
  };
};
export default useEvent;
