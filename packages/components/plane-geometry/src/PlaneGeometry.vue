<script   lang="ts">
import { defineComponent, watch, onUnmounted } from "vue";
import usePlaneGeometry from "./plane-geometry";
export default defineComponent({
  props: {
    width: Number,
    height: Number,
    widthSegments: Number,
    heightSegments: Number,
  },
  setup(props) {
    const { width, height, widthSegments, heightSegments } = props;
    let { getInstance, remove, replace } = usePlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );
    watch(props, (val, oldVal) => {
      replace(props);
    });
    onUnmounted(() => {
      remove();
    });
  },
});
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>
