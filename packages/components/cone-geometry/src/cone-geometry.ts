import { getCore } from "@sandi-ui/utils"
import { ConeGeometry } from "three"
import { EventType } from '@sandi-ui/enum';

const useConeGeometry = (radius: number | undefined, height: number | undefined, radialSegments: number | undefined, heightSegments: number | undefined, openEnded: boolean | undefined, thetaStart: number | undefined, thetaLength: number | undefined) => {
    const core = getCore()
    let node = new ConeGeometry(radius,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength);
    const { parentId, id } = core.addNode(node);
    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.ChangGeometry, geometry: node })

    }
    const replace = (props: any) => {
        if (parentId) {
            const { height,
                radialSegments,
                heightSegments,
                openEnded,
                thetaStart,
                thetaLength } = props;
            const newNode = new ConeGeometry(height,
                radialSegments,
                heightSegments,
                openEnded,
                thetaStart,
                thetaLength);
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

export default useConeGeometry;