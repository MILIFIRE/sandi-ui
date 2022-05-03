import { getCore } from "@sandi-ui/utils"
import type { BufferGeometry } from "three"
import { EventType } from '@sandi-ui/enum';

const useGeometry = (geometry: BufferGeometry) => {
    const core = getCore()
    const { parentId, id } = core.addNode(geometry);
    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.ChangGeometry, geometry })

    }
    const changGeometry = (newGeometry: BufferGeometry) => {
        if (parentId) {
            core.dispatchEventById(parentId, { type: EventType.ChangGeometry, geometry: newGeometry })
            core.setNode(id, newGeometry)
            geometry = newGeometry;
        }
    }
    const remove = () => {
        geometry.dispose()
        core.delNode(id)
    }
    const getInstance = () => changGeometry
    return { changGeometry, remove, getInstance }
}

export default useGeometry;