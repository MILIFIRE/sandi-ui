import { getCore } from "@sandi-ui/utils"

import { Group } from "three"
import { EventType } from '@sandi-ui/enum';
const useGroup = () => {
    const core = getCore()

    let instance = new Group()
    const { parentId, id } = core.addNode(instance);

    core.addEventListenerById(id, EventType.AddObject3d, (Event) => {
        const { object3d } = Event;
        instance.add(object3d)
    })

    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.AddObject3d, object3d: instance })
    }
    const getInstance = () => {
        return instance
    }
    return { getInstance }
}

export default useGroup;