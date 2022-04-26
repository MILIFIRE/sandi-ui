<script   lang="ts">
import { defineComponent, watch, onUnmounted } from "vue";
import useCylinderGeometry from "./cylinder-geometry";
export default defineComponent({
  props: {
    radiusTop: Number,
    radiusBottom: Number,
    height: Number,
    radialSegments: Number,
    heightSegments: Number,
    openEnded: Boolean,
    thetaStart: Number,
    thetaLength: Number,
  },
  setup(props) {
    const {
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    } = props;
    let { getInstance, remove, replace } = useCylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength
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
