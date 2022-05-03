<script  lang="ts">
import { defineProps, onMounted, onUnmounted, defineComponent } from "vue";
import usePerspectiveCamera from "./perspectiveCamera";
import { object3dProps, propsWatch } from "../../object3d/props";
export default defineComponent({
    props: {
        ...object3dProps,
        fov: {
            type: Number,
        },
        aspect: {
            type: Number,
        },
        near: {
            type: Number,
        },
        far: {
            type: Number,
        },
    },
    setup(props) {
        const { fov, aspect, near, far } = props;
        const { instance } = usePerspectiveCamera(fov, aspect, near, far);
        propsWatch(props, instance);
        onMounted(() => { });
        return { instance };
    },
});
</script>

<template></template>

<style scoped>
</style>
