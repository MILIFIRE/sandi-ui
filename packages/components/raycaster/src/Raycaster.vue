<template></template>
<script lang="ts">
import { ArrowHelper, Object3D, Vector3 } from "three";
import type { Intersection, Event, ColorRepresentation } from "three";
import { defineComponent, onUnmounted, watch } from "vue";
import type { PropType } from "vue";
import useRaycaster from "./raycaster";
interface helper {
    color?: ColorRepresentation,
    headLength?: number,
    headWidth?: number,
}
const aryToV3=(ary)=>{
    const [x,y,z] = ary 
    return new Vector3(x,y,z)
}
export default defineComponent({
    props: {
        origin: { type: Array, require: false, default: [0,0,0] },
        offset: { type: Array, require: false, default: [0,0,0] },
        direction: { type: Array, require: false, default: [0,1,0] },
        near: { type: Number, require: false, default: 0 },
        far: { type: Number, require: false, default: Infinity },
        disabled: { type: Boolean, require: false, default: false },
        raycasterCallback: {
            type: Function as PropType<(target: Object3D<Event>,
                ary: Object3D<Event>[],
                intersects: Intersection<Object3D<Event>>[]) => void>,
            require: false,
            default: () => { }
        },
        lockDirection: {
            type: Boolean, require: false, default: true
        },

        object: {
            type: Object3D,
            require: false
        },
        checkObjectArray: {
            type: Array as PropType<Object3D[]>,
            require: false
        },
        helper: { type: Object as PropType<helper>, require: false, default: null }
    },
    setup(props) {
        const { origin, direction, near, far } = props
        const { setEnabled, setOffset, updateBack, instance, remove, setHelper, setLockDirection } = useRaycaster(aryToV3(origin), aryToV3(direction), near, far);
        updateBack(props.raycasterCallback);
        setHelper(props.helper);
        setOffset(aryToV3(props.offset));
        setLockDirection(props.lockDirection)
        watch(() => props.origin, (val) => {
            instance.ray.origin.copy(aryToV3(val));
        })
        watch(() => props.direction, (val) => {
            instance.ray.direction.copy(aryToV3(val));
        })
        watch(() => props.near, (val) => {
            instance.near = val;
        })
        watch(() => props.far, (val) => {
            instance.far = val;
        })
        watch(() => props.disabled, (val) => {
            setEnabled(val);
        })
        watch(() => props.raycasterCallback, (val) => {
            updateBack(val);
        })
        watch(() => props.helper, (val) => {
            setHelper(val);
        })
        watch(() => props.offset, (val) => {
            setOffset(aryToV3(val));
        })
        watch(() => props.lockDirection, (val) => {
            setLockDirection(val)
        })
        onUnmounted(() => {
            remove()
        })
    },
});
</script>
