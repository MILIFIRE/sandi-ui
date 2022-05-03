<script   lang="ts">
import { Material, BufferGeometry } from "three";
import useGroup from "./group";
import { object3dProps, propsWatch } from "../../object3d/props";
import { defineComponent, onUnmounted, watch } from "vue";
import type { PropType } from "vue";
export default defineComponent({
    props: {
        ...object3dProps,
        click: {
            type: Function as PropType<() => void>,
            required: false,
        },
        pointerOver: {
            type: Function as PropType<() => void>,
            required: false,
        },
        pointerOut: {
            type: Function as PropType<() => void>,
            required: false,
        }
    },
    setup(props) {
        const { getInstance, setClick, setPointerOver, setPointerOut, remove } = useGroup(props.click);
        getInstance().position.set(0, 0, 0);
        propsWatch(props, getInstance());
        onUnmounted(() => { });
        setClick(props.click)
        watch(() => props.click, (val) => {
            if (typeof val == 'function') {
                setClick(val)
            }
        })
        watch(() => props.pointerOver, (val) => {
            if (typeof val == 'function') {
                setPointerOver(val)
            }
        })
        watch(() => props.pointerOut, (val) => {
            if (typeof val == 'function') {
                setPointerOut(val)
            }
        })
        onUnmounted(() => { remove() });

        return { getInstance }
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
