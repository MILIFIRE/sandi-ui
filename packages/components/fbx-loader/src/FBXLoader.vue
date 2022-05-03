<script  lang="ts">
import { defineComponent, onUnmounted } from "vue";
import useFBXLoader from "./fbx-loader";

export default defineComponent({
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const { instance, remove } = useFBXLoader(props.url);
        onUnmounted(() => {
            remove()
        })
        return { instance };
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
