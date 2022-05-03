<script  lang="ts">
import type { PropType } from "vue";
import { defineComponent, onUnmounted, watch } from "vue";
import { Color, Texture } from "three";
import useBasicMaterial from "./mesh-lambert-material";
import { diffProps } from "@sandi-ui/utils"
export default defineComponent({
    props: {
        alphaMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        aoMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        aoMapIntensity: {
            type: Number,
            default: 1
        },
        color: { type: Number, default: 0xffffff },
        combine: {
            type: Number,
            default: 0
        },
        emissive: {
            type: Number,
            default: 0x000000
        },
        emissiveMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        emissiveIntensity: {
            type: Number,
            default: 1
        },
        envMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        lightMap: {
            type: Number,
            default: 1
        },
        lightMapIntensity: {
            type: Number,
            default: 1
        },
        map: {
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
        specularMap: {
            type: Object as PropType<Texture>,
            default: null
        },
        wireframe: {
            type: Boolean,
            default: false
        },
        wireframeLinecap: {
            type: String,
            default: 'round'
        },
        wireframeLinejoin: {
            type: String,
            default: 'round'
        },
        wireframeLinewidth: {
            type: Number,
            default: 1
        },
        meshName: String,
    },
    setup(props) {
        const { instance, remove } = useBasicMaterial(props);
        onUnmounted(() => {
            remove()
        });
        watch(props, (val, old) => {
            diffProps(val, old).forEach(prop => {
                if (prop == 'color') {
                    instance.color = new Color(val[prop]);
                } else {
                    instance[prop] = val[prop]
                }
            });

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
