<script  lang="ts">
import { onUnmounted, watch, type PropType } from "vue";
import { onMounted, defineComponent } from "vue";
import usePointerLockControls from "./pointerlock-controls";
import { Camera } from "three";
interface character { gravity: number, mass: number, moveScale: number, movingResistance: number, characterHeight: number, junpHeight: number }
export default defineComponent({
    props: {
        camera: {
            type: Camera,
            required: false,
        },
        domElement: {
            type: Object as PropType<HTMLCanvasElement>,
            required: false,
        },
        lock: {
            type: Boolean,
            default: false
        },
        connect: {
            type: Boolean,
            default: true
        },
        unlockCallback: {
            type: Function as PropType<() => void>,
            required: false
        },
        options: {
            type: Object as PropType<character>,
            required: false
        }
    },
    setup(props) {
        onMounted(() => {
            const { instance, setCharacter, setCallBack, remove } = usePointerLockControls(props.camera, props.domElement);
            if (props.lock) {
                instance.lock();
            }
            if (props.options) [
                setCharacter(props.options)
            ]
            watch(() => props.lock, (val) => {
                if (val) {
                    instance.lock();
                } else {
                    instance.unlock();
                }
            })
            watch(() => props.options, (val) => {
                if (val) setCharacter(val)
            })
            if (props.unlockCallback) {
                setCallBack('unlock', props.unlockCallback)
            }
            onUnmounted(() => {
                if (remove) {
                    remove()
                }
            })
        });

    },
});
</script>

<template></template>

<style scoped>
</style>
