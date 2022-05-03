<script  lang="ts">
import { defineProps, ref, onMounted, defineComponent, onUnmounted } from "vue";
import { WebGLRenderer } from "three";
import useSpotLight from "./spot-light";
export default defineComponent({
    props: {
        color: {
            type: Number,
            defaule: 0xffffff,
        },
        intensity: {
            type: Number,
            defaule: 1,
        },
        distance: {
            type: Number,
            defaule: 0,
        },
        angle: {
            type: Number,
            defaule: 2,
        },
        penumbra: {
            type: Number,
            defaule: 0,
        },
        decay: {
            type: Number,
            defaule: 1,
        },

    },
    setup(props) {
        const { instance } = useSpotLight(props.color, props.intensity, props.distance, props.angle, props.penumbra, props.decay);
        onUnmounted(() => { instance.dispose() });
    },
});
</script>

<template>
    <div ref="rendererDom"></div>
</template>

<style scoped>
</style>
