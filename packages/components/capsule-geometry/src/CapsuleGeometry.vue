<script   lang="ts">
import { defineComponent, watch, onUnmounted } from "vue";
import useCapsuleGeometry from "./capsule-geometry";
export default defineComponent({
  props: {
    radius: Number,
    length: Number,
    capSubdivisions: Number,
    radialSegments: Number,
  },
  setup(props) {
    const { radius, length, capSubdivisions, radialSegments } = props;
    let { getInstance, remove, replace } = useCapsuleGeometry(
      radius,
      length,
      capSubdivisions,
      radialSegments
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
