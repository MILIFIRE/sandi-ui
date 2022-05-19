<template>
    <div ref="css3d">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useCSS3DObject } from "./css3d-object"
import { object3dProps, propsWatch } from "../../object3d/props";

export default defineComponent({
    props: {
        ...object3dProps,
    },
    setup(props) {
        let watchStopSet;
        const css3d = ref()

        onMounted(() => {
            const { instance, id } = useCSS3DObject(css3d.value);
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
        return { css3d }
    }
})
</script>