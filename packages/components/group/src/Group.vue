<script   lang="ts">
import { Material, BufferGeometry } from "three";
import useGroup from "./group";
import { object3dProps, propsWatch, watchEvent, eventProps } from "../../object3d/props";
import { defineComponent, onUnmounted, watch } from "vue";
import type { PropType } from "vue";
export default defineComponent({
    props: {
        ...object3dProps,
        ...eventProps,
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
        const { getInstance, remove, id } = useGroup(props.click);
        getInstance().position.set(0, 0, 0);
        propsWatch(props, getInstance());
        let removeEvent = watchEvent(props, id)

        onUnmounted(() => { });

        onUnmounted(() => { remove(); removeEvent() });

        return { getInstance }
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
