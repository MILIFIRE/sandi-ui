<script  lang="ts">
import { defineComponent } from "vue";
import useFBXLoader from "./fbx-loader";

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { instance } = useFBXLoader(props.url);

    return { instance };
  },
});
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>
