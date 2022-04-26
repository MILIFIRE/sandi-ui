import { getCore } from "@sandi-ui/utils"
import { CylinderGeometry } from "three"
import { EventType } from '@sandi-ui/enum';

const useCylinderGeometry = (radiusTop: number | undefined, radiusBottom: number | undefined, height: number | undefined, radialSegments: number | undefined, heightSegments: number | undefined, openEnded: boolean | undefined, thetaStart: number | undefined, thetaLength: number | undefined) => {
    const core = getCore()
    let node = new CylinderGeometry(radiusTop,
        radiusBottom,
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
            const { radiusTop,
                radiusBottom,
                height,
                radialSegments,
                heightSegments,
                openEnded,
                thetaStart,
                thetaLength } = props;
            const newNode = new CylinderGeometry(radiusTop,
                radiusBottom,
                height,
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

export default useCylinderGeometry;