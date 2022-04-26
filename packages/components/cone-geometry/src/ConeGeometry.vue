<script   lang="ts">
import { defineComponent, watch, onUnmounted } from "vue";
import useCapsuleGeometry from "./cone-geometry";
export default defineComponent({
  props: {
    radius: Number,
    height: Number,
    radialSegments: Number,
    heightSegments: Number,
    openEnded: Boolean,
    thetaStart: Number,
    thetaLength: Number,
  },
  setup(props) {
    const {
      radius,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    } = props;
    let { getInstance, remove, replace } = useCapsuleGeometry(
      radius,
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
