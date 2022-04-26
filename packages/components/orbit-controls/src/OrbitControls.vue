<script   lang="ts">
import { onMounted, defineComponent } from "vue";
import type { PropType } from "vue";
import useOrbitControls from "./orbit-controls";
import { Camera } from "three";
export default defineComponent({
  props: {
    camera: {
      type: Camera,
      required: false,
    },
    domElement: {
      type: Object as PropType<HTMLCanvasElement>,
      required: false,
    },
  },
  setup(props) {
    onMounted(() => {
      const { instance } = useOrbitControls(props.camera, props.domElement);
      return { instance };
    });
  },
});
</script>

<template>
  <div ref="rendererDom"></div>
</template>

<style scoped>
</style>
