<script  lang="ts">
import type { PropType } from "vue";
import { defineComponent, onUnmounted, watch } from "vue";
import { Color, Texture } from "three";
import useBasicMaterial from "./mesh-basic-material";
export default defineComponent({
    props: {
        color: { type: Number, default: 0xffffff },
        map: {
            type: Object as PropType<Texture>,
            default: null
        },
        alphaMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        aoMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        reflectivity: {
            type: Number,
            default: 1
        },
        refractionRatio: {
            type: Number,
            default: 0.98
        },
        meshName: String,
    },
    setup(props) {
        const { instance, remove } = useBasicMaterial(props);
        onUnmounted(() => {
            remove()
        });
        watch(props, (val) => {
            const { color, map, alphaMap, reflectivity, refractionRatio } = val;
            instance.color = new Color(color);
            if (map) {
                instance.map = map;
            }
            if (alphaMap) {
                instance.alphaMap = alphaMap;
            }
            if (reflectivity) {
                instance.reflectivity = reflectivity;
            }
            if (refractionRatio) {
                instance.refractionRatio = refractionRatio;
            }
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
