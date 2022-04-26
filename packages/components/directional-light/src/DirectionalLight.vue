<script  lang="ts">
import { defineProps, ref, onMounted, defineComponent } from "vue";
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
    const { instance } = useDsirectionalLight(props.color, props.intensity);
    onMounted(() => {});
  },
});
</script>

<template>
  <div ref="rendererDom"></div>
</template>

<style scoped>
</style>
