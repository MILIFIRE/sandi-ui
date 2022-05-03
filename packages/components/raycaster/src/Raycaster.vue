<template></template>
<script lang="ts">
import { Object3D, Vector3 } from "three";
import type { Intersection, Event } from "three";
import { defineComponent, onUnmounted, watch } from "vue";
import type { PropType } from "vue";
import useRaycaster from "./raycaster";
export default defineComponent({
    props: {
        origin: { type: Vector3, require: false, default: new Vector3() },
        direction: { type: Vector3, require: false, default: new Vector3() },
        near: { type: Number, require: false, default: 0 },
        far: { type: Number, require: false, default: Infinity },
        disabled: { type: Boolean, require: false, default: false },
        inspectionScope: { type: String, require: false, default: "scene" },
        raycasterCallback: {
            type: Function as PropType<(target: Object3D<Event>,
                ary: Object3D<Event>[],
                intersects: Intersection<Object3D<Event>>[]) => void>,
            require: false,
            default: () => { }
        },
        mode: {
            type: String,
            default: 'normal'
        },

    },
    setup(props) {
        const { origin, direction, near, far } = props
        const { changeMode, setEnabled, setInspectionScope, updateBack, instance, remove } = useRaycaster(origin, direction, near, far);
        changeMode(props.mode)
        updateBack(props.raycasterCallback);
        watch(() => props.origin, (val) => {
            instance.ray.origin.copy(val);
        })
        watch(() => props.direction, (val) => {
            instance.ray.direction.copy(val);
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
        watch(() => props.inspectionScope, (val) => {
            setInspectionScope(val);
        })
        watch(() => props.raycasterCallback, (val) => {
            updateBack(val);
        })
        watch(() => props.mode, (val) => {
            changeMode(val);
        })
        onUnmounted(() => {
            remove()
        })
    },
});
</script>
