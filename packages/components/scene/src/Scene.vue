<script  lang="ts">
import { onUnmounted, onMounted, defineComponent } from "vue";
import useScenes from "./scene";
export default defineComponent({
  setup() {
    const { instance } = useScenes();

    onMounted(() => {
      // 子组件先挂载
    });
    onUnmounted(() => {
      // 子组件先销毁
    });
  },
});
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>
