import { getCore } from "@sandi-ui/utils"
import { CapsuleGeometry } from "three"
import { EventType } from '@sandi-ui/enum';

const useCapsuleGeometry = (radius: number | undefined, length: number | undefined, capSubdivisions: number | undefined, radialSegments: number | undefined) => {
    const core = getCore()
    let node = new CapsuleGeometry(radius, length, capSubdivisions, radialSegments);
    const { parentId, id } = core.addNode(node);
    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.ChangGeometry, geometry: node })

    }
    const replace = (props: any) => {
        if (parentId) {
            const { radius, length, capSubdivisions, radialSegments } = props;
            const newNode = new CapsuleGeometry(radius, length, capSubdivisions, radialSegments);
            core.dispatchEventById(parentId, { type: EventType.ChangGeometry, geometry: newNode })
            core.setNode(id, newNode)
            node.dispose()
            node = newNode;
        }

    }
    const remove = () => {
        node.dispose()
        core.delNode(id)
    }
    const getInstance = () => node
    return { getInstance, remove, replace }
}

export default useCapsuleGeometry;