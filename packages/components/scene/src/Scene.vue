<script  lang="ts">
import { onUnmounted, onMounted, defineComponent } from "vue";
import useScenes from "./scene";
export default defineComponent({
    setup() {
        const { instance } = useScenes();

        onMounted(() => {
        });
        onUnmounted(() => {
        });
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
