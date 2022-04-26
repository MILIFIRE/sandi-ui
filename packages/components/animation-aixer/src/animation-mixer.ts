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
            // 模型加载完成
            const { object3d, animations } = event.payload
            // 动画混淆器

            instance = new AnimationMixer(object3d)
            renderBcak = (delta: number) => {
                instance.update(delta)
            }
            if (renderId) {
                core.dispatchEventById(renderId, { type: EventType.Render, render: renderBcak })
            }
            // 分发 actions 的 动作
            core.dispatchEventById(id, { type: EventType.AnimationMixerLoaded, mixer: instance, animations })
        })
    }

    return {
        getInstance,
        removeRender
    }
}
export default useAnimationMixer
