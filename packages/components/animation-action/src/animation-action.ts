import type { AnimationAction, AnimationClip, AnimationMixer } from "three";
import { EventType, LoopMode } from '@sandi-ui/enum'
import { getCore } from "@sandi-ui/utils"

const useAnimationAction = (mixer: undefined | AnimationMixer, clip: undefined | AnimationClip, props: any) => {
    const core = getCore()
    let instance: AnimationAction;
    let animations: AnimationClip[] = [];
    const { parentId, id } = core.getParentAndId()

    const setAnimationClip = (id: string | number | undefined) => {
        let clip
        switch (typeof id) {
            case "string":
                clip = animations.find(item =>
                    item.name == id
                )
                break
            case "number":
                clip = animations[id];
                break
            default:
                clip = animations[0];
        }
        if (mixer && clip) {
            if (instance) {
                instance.stop();
            }
            instance = mixer.clipAction(clip)
            instance.play()

        } else {
            console.log('动画不存在')
        }
    }
    const setWeight = (weight: number) => {
        instance.weight = weight
    }
    const setTimeScale = (timeScale: number) => {
        instance.timeScale = timeScale
    }
    const setLoop = (loopMode: number, loop: number) => {
        instance.setLoop(loopMode, loop)
    }
    const setStatue = (statue: string) => {
        switch (statue) {
            case "play":
                instance.play();
                break;
            case "stop":
                instance.stop();
                break;
            case "reset":
                instance.reset()
                break;
            default:
                instance.play();
        }
    }
    const setProps = (weight: number, timeScale: number, loopMode: number, loop: number, statue: string) => {
        setWeight(weight);
        setTimeScale(timeScale);
        setLoop(loopMode, loop);
        setStatue(statue)
    }

    const getInstance = () => {
        return instance
    }
    // if (mixer && clip) {
    //     instance = mixer.clipAction(clip)
    //     setAnimationClip(props.id)
    //     setProps(weight, timeScale, loopMode, loop, statue);

    // }
    if (parentId) {
        core.addEventListenerById(parentId, EventType.AnimationMixerLoaded, (event) => {
            const { mixer: _mixer, animations: _animations } = event
            mixer = _mixer;
            animations = _animations;
            setAnimationClip(props.id)
            const { weight, timeScale, loopMode, loop, statue } = props;
            setProps(weight, timeScale, loopMode, loop, statue);
        })
    }

    return { getInstance, setAnimationClip, setWeight, setProps }
}
export default useAnimationAction