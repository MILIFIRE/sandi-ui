<script  lang="ts">
import { defineProps, ref, onMounted, defineComponent, onUnmounted } from "vue";
import { WebGLRenderer } from "three";
import useDsirectionalLight from "./directional-light";
export default defineComponent({
    props: {
        color: {
            type: Number,
            defaule: 0xffffff,
        },
        intensity: {
            type: Number,
            defaule: 2,
        },
    },
    setup(props) {
        const { instance, remove } = useDsirectionalLight(props.color, props.intensity);
        onUnmounted(() => remove());
    },
});
</script>

<template>
    <div ref="rendererDom"></div>
</template>

<style scoped>
</style>
