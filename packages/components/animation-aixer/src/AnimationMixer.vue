<script  lang="ts">
import { onUnmounted, defineComponent } from "vue";
import useAnimationMixer from "./animation-mixer";
export default defineComponent({
    props: { id: { type: Number, default: 0 } },
    setup() {
        const { getInstance, remove } = useAnimationMixer();
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
