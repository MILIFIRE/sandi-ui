<script  lang="ts">
import { onUnmounted, type PropType } from "vue";
import { onMounted, defineComponent } from "vue";
import useTransformControls from "./transform-controls";
import { Camera } from "three";
export default defineComponent({
    props: {
        camera: {
            type: Camera,
            required: false,
        },
        domElement: {
            type: Object as PropType<HTMLCanvasElement>,
            required: false,
        },
    },
    setup(props) {
        onMounted(() => {
            const { instance, remove } = useTransformControls(props.camera, props.domElement);
            onUnmounted(() => {
                if (remove) remove()
            })
            return { instance };
        });
    },
});
</script>

<template></template>

<style scoped>
</style>
