<script   lang="ts">
import { defineComponent, watch, onUnmounted } from "vue";
import useBoxGeometry from "./box-geometry";
export default defineComponent({
  props: {
    width: Number,
    height: Number,
    depth: Number,
    widthSegments: Number,
    heightSegments: Number,
    depthSegments: Number,
  },
  setup(props) {
    const {
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
    } = props;
    let { getInstance, remove, replace } = useBoxGeometry(
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments
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
