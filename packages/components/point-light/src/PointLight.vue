<script  lang="ts">
import { defineProps, ref, onMounted, defineComponent } from "vue";
import { WebGLRenderer } from "three";
import usePointLight from "./point-light";
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
        decay: {
            type: Number,
            defaule: 2,
        }
    },
    setup(props) {
        const { instance } = usePointLight(props.color, props.intensity, props.distance, props.decay);
        onMounted(() => { });
    },
});
</script>

<template>
    <div ref="rendererDom"></div>
</template>

<style scoped>
</style>
