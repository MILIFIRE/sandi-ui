import { CSS3DObject } from "@sandi-ui/modules";
import { getCore } from "@sandi-ui/utils";
import type { Object3D } from "three";

const useCSS3DObject = (dom) => {
  const core = getCore();
  const instance = new CSS3DObject(dom);
  const { parentId, id } = core.addNode(instance);
  if(parentId){
    const { node: parent } = core.getNode(parentId);
    if((parent as Object3D).isObject3D){
        parent.add(instance)
    }
  }
  const remove =()=>{
    if(instance && instance.parent){
        instance.parent.remove(instance)
    }
  }
  return {remove,id,instance}
};
export { useCSS3DObject };
