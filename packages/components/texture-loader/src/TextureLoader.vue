<script  lang="ts">
import { defineComponent, onUnmounted, watch } from "vue";
import { useTexture } from "./texture";
export default defineComponent({
    props: {
        type: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        disabled: Boolean,
    },
    setup(props) {
        const { instance, setTexture } = useTexture();
        const texture = instance.load(props.url);
        if (!props.disabled) {
            setTexture(texture, props.type);
        }
        watch(
            () => props.disabled,
            (val) => {
                if (!val) {
                    setTexture(texture, props.type);
                }
            }
        );

        onUnmounted(() => {
            texture.dispose();
        });
        return { instance };
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
