import { getCore } from "@sandi-ui/utils"

// import { Objects } from "../enum/objects"
import { Group, Mesh, Object3D, Material, BoxGeometry, } from "three"
import { EventType } from '@sandi-ui/enum';

type Objects = Mesh | Group


const useBoxGeometry = (width: number | undefined, height: number | undefined, depth: number | undefined, widthSegments: number | undefined, heightSegments: number | undefined, depthSegments: number | undefined) => {
    const core = getCore()
    let node = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
    const { parentId, id } = core.addNode(node);
    if (parentId) {
        core.dispatchEventById(parentId,{type:EventType.ChangGeometry,geometry:node})

    }
    const replace = (props:any)=>{
        if(parentId){
            const {width, height, depth, widthSegments, heightSegments, depthSegments} =props;
            const newNode = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
            core.dispatchEventById(parentId,{type:EventType.ChangGeometry,geometry:newNode})
            core.setNode(id,newNode)
            node.dispose()
            node = newNode;
        }

    }
    const remove = () => {
        node.dispose()
        core.delNode(id)
    }
    const getInstance=()=>node
    return {getInstance, remove,replace }
}

export default useBoxGeometry;