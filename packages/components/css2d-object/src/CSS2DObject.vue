<template>
    <div ref="css2d">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useCSS2DObject } from "./css2d-object"
import { object3dProps, propsWatch } from "../../object3d/props";

export default defineComponent({
    props: {
        ...object3dProps,
    },
    setup(props) {
        let watchStopSet;
        const css2d = ref()

        onMounted(() => {
            const { instance, id } = useCSS2DObject(css2d.value);
            if (watchStopSet) {
                watchStopSet()
            }
            watchStopSet = propsWatch(props, instance);
        })
        onUnmounted(() => {
            if (watchStopSet) {
                watchStopSet()
            }
        })
        return { css2d }
    }
})
</script>