import type { Plugin } from "vue";
import { getCurrentInstance } from "vue";
import type v3dCore from "@sandi-ui/core";
import { OrbitControls } from "@sandi-ui/modules";
import { Camera, Group, Material, Mesh, Texture, type Object3D } from "three";
import { V3dNodeCheck } from "@sandi-ui/enum";
type SFCInstallWrap<T> = T & Plugin;
export const installComponentWrap = <T>(name: string, component: T) => {
  (component as SFCInstallWrap<T>).install = (app): void => {
    app.component(name, component);
  };
  return component as any;
};
export const getCore = () => {
  const vm = getCurrentInstance();
  if (vm) {
    return vm.appContext.config.globalProperties.$getv3dCore() as v3dCore;
  } else {
    throw Error("Sandi-ui:Core实例获取错误");
  }
};
export const getNow = (): number => {
  return (typeof performance === "undefined" ? Date : performance).now();
};
export const extractNode = (
  object: any,
  type: V3dNodeCheck
): Mesh | Group | null => {
  let result = object;
  switch (type) {
    case V3dNodeCheck.isMesh:
      result = object;
      break;
    case V3dNodeCheck.isGroup:
      result = object;
      break;
    case V3dNodeCheck.isFBX:
      if (object && object.object3d) {
        result = object.object3d;
      } else {
        result = null;
      }
      break;
    case V3dNodeCheck.isGLTF:
      if (object.gltf && object.gltf.scene) {
        result = object.gltf.scene;
      } else {
        result = null;
      }
      break;
  }
  return result;
};
export const filterV3dNode = (
  objects: (Mesh | Group)[],
  filterKeys: V3dNodeCheck[],
  extract = false
) => {
  let res: any = [];
  return objects.reduce((ary, item) => {
    const res = filterKeys.find((key) => item[key]);
    if (res) {
      if (extract) {
        let node = extractNode(item, res);
        if (node) {
          ary.push(node);
        }
      } else {
        ary.push(item);
      }
    }
    return ary;
  }, res) as (Mesh | Group)[];
};

export const isMesh = (object: any) => {
  if (object.isMesh) {
    return true;
  } else {
    false;
  }
};
export const isOrbit = (object: any) => {
  if (object instanceof OrbitControls) {
    return true;
  } else {
    false;
  }
};
export const diffProps = (val: any, old: any) => {
  let diff: string[] = [];
  Object.keys(old).forEach((prop) => {
    const newVal = val[prop];
    const oldVal = old[prop];
    if (newVal !== oldVal && typeof newVal === typeof oldVal) {
      diff.push(prop);
    }
  });
  return diff;
};

export const disposeMaterial = (material: Material) => {
  Object.keys(material).forEach((key) => {
    if (material[key] instanceof Texture) {
      material[key].dispose();
    }
  });
};

export const disposeMesh = (object: Mesh) => {
  if (object.material instanceof Material) {
    disposeMaterial(object.material);
    object.material.dispose();
  }
  if (object.geometry) {
    object.geometry.dispose();
  }
};

export const deepDispose = (object: any) => {
  let queue: any[] = [object];
  let set = new Set();
  while (queue.length != 0) {
    const object = queue.pop();
    if (object?.children && object.children.length > 0) {
      object.children.forEach((item) => {
        if (!set.has(item)) {
          queue.push(item);
          set.add(item);
        }
      });
    }
    if (object instanceof Mesh) {
      disposeMesh(object as Mesh);
    } else {
      if ((object as any).dispose) {
        object.dispose();
      }
    }
  }
};
