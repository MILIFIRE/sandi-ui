import { inject } from 'vue';
import { AnimationMixer } from "three"
import { EventType } from '@sandi-ui/enum'
import { getCore } from "@sandi-ui/utils"

import { RENDER_ID } from "@sandi-ui/constants"

//  场景
const useAnimationMixer = () => {
    const core = getCore()

    let instance: AnimationMixer;
    let renderBcak: (delta: number) => void;
    const { parentId, id } = core.addNode({})
    const renderId = inject<number>(RENDER_ID);
    const getInstance = () => {
        return instance
    }
    const removeRender = () => {
        if (renderId && renderBcak) {
            core.dispatchEventById(renderId, { type: EventType.RemoveRender, render: renderBcak })
        }
    }
    if (parentId) {
        core.addEventListenerById(parentId, EventType.AnimationsReady, (event) => {
            // model loaded
            const { object3d, animations } = event.payload
            instance = new AnimationMixer(object3d)
            renderBcak = (delta: number) => {
                instance.update(delta)
            }
            core.setNode(id, instance)
            if (renderId) {
                core.dispatchEventById(renderId, { type: EventType.Render, render: renderBcak })
            }
            // dispatch actions 
            core.dispatchEventById(id, { type: EventType.AnimationMixerLoaded, mixer: instance, animations })
        })
    }
    const remove = () => {
        core.delNode(id)
    }
    return {
        getInstance,
        removeRender,
        remove
    }
}
export default useAnimationMixer
