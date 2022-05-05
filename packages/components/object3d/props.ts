import type { SDEvent } from "@sandi-ui/enum";
import type { Object3D } from "three";
import { watch, type PropType, type WatchStopHandle } from "vue";
import { getCore } from "@sandi-ui/utils";
const eventList = [
  "onClick",
  "onPointerMove",
  "onPointerDown",
  "onPointerUp",
  "onWheel",
  "onDblClick",
  "onKeyDown",
  "onKeyup",
  "onKeypress",
  "onContextmenu",
  "onPointerOut",
  "onPointerOver",
  "onPointerMissed",
  "onKeyMissed",
];

export const eventProps = {
  onClick: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onPointerMove: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onPointerDown: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onPointerUp: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onWheel: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onDblClick: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onKeyDown: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onKeyup: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onKeypress: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onContextmenu: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onPointerOut: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onPointerOver: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onPointerMissed: {
    type: Function as PropType<() => void>,
    required: false,
  },
  onKeyMissed: {
    type: Function as PropType<() => void>,
    required: false,
  },
};

export const watchEvent = (props, id) => {
  const core = getCore();
  eventList.forEach((key) => {
    const event = key.replace("on", "").toLowerCase() as SDEvent;
    if (props[key]) {
      core.setEvenet(event, id, props[key]);
    }
    watch(
      () => props[key],
      (val, oldVal) => {
        if (typeof val === "function") {
          core.setEvenet(event, id, val);
        } else {
          core.delEvenet(event, id);
        }
      }
    );
  });
  return () => {
    eventList.forEach((key) => {
      const event = key.replace("on", "").toLowerCase() as SDEvent;
      core.delEvenet(event, id);
    });
  };
};

export const object3dProps = {
  translateX: {
    type: Number,
    require: false,
  },
  translateY: {
    type: Number,
    require: false,
  },
  translateZ: {
    type: Number,
    require: false,
  },
  rotateX: {
    type: Number,
    require: false,
  },
  rotateY: {
    type: Number,
    require: false,
  },
  rotateZ: {
    type: Number,
    require: false,
  },
  rotationX: {
    type: Number,
    require: false,
  },
  rotationY: {
    type: Number,
    require: false,
  },
  rotationZ: {
    type: Number,
    require: false,
  },
  positionX: {
    type: Number,
    require: false,
  },
  positionY: {
    type: Number,
    require: false,
  },
  positionZ: {
    type: Number,
    require: false,
  },
  scaleX: {
    type: Number,
    require: false,
  },
  scaleY: {
    type: Number,
    require: false,
  },
  scaleZ: {
    type: Number,
    require: false,
  },
  scaleXYZ: {
    type: Number,
    require: false,
  },
  visible: {
    type: Boolean,
    require: false,
  },
};

const watchWrap = (map: Set<WatchStopHandle>, unWatch: WatchStopHandle) => {
  map.add(unWatch);
};
const isFunction = (prop: any) => typeof prop === "function";
const mapFn = (
  watchSet: Set<WatchStopHandle>,
  props: any,
  instance: Object3D,
  mapKey: string,
  key1: string,
  key2: string
) => {
  if (instance[key1]) {
    if (props[mapKey]) {
      instance[key1][key2] = props[mapKey];
    }
    watchWrap(
      watchSet,
      watch(
        () => props[mapKey],
        (val: any, oldVal: any) => {
          instance[key1][key2] = val;
        }
      )
    );
  }
};
export const propsWatch = (props: any, instance: Object3D) => {
  const watchSet = new Set<WatchStopHandle>();
  const mapProps = {
    positionX: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "positionX", "position", "x");
    },
    positionY: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "positionY", "position", "y");
    },
    positionZ: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "positionZ", "position", "z");
    },
    rotationX: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "rotationX", "rotation", "x");
    },
    rotationY: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "rotationY", "rotation", "y");
    },
    rotationZ: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "rotationZ", "rotation", "z");
    },
    scaleX: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "scaleX", "scale", "x");
    },
    scaleY: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "scaleY", "scale", "y");
    },
    scaleZ: (props: any, instance: Object3D) => {
      mapFn(watchSet, props, instance, "scaleZ", "scale", "z");
    },
    scaleXYZ: (props: any, instance: any, val: any, oldVal: any) => {
      if (props["scaleXYZ"]) {
        let val = props["scaleXYZ"];
        instance.scale.set(val, val, val);
      }
      watchWrap(
        watchSet,
        watch(
          () => props["scaleXYZ"],
          (val: any, oldVal: any) => {
            instance.scale.set(val, val, val);
          }
        )
      );
    },
  };

  for (let propKey in object3dProps) {
    if (instance[propKey]) {
      if (props[propKey]) {
        if (isFunction(instance[propKey])) {
          instance[propKey](props[propKey]);
        } else {
          instance[propKey] = props[propKey];
        }
      }
      watchWrap(
        watchSet,
        watch(
          () => props[propKey],
          (val: any) => {
            if (isFunction(instance[propKey])) {
              instance[propKey](val);
            } else {
              instance[propKey] = val;
            }
          }
        )
      );
    } else {
      if ((mapProps as any)[propKey]) {
        (mapProps as any)[propKey](props, instance);
      } else {
        console.log("instance not have props ", propKey);
      }
    }
  }
  return () => {
    watchSet.forEach((unwatch) => {
      unwatch();
    });
  };
};
