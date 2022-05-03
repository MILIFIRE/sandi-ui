<script   lang="ts">
import { Material, BufferGeometry, Mesh } from "three";
import useMaterial from "./material";
import { defineComponent, onUnmounted, watch } from "vue";
export default defineComponent({
    props: {
        material: {
            type: Material,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: false,
        },
        meshName: {
            type: String,
            required: false,
        }
    },
    setup(props) {
        const { changMaterial, remove } = useMaterial(props.material, props.meshName)
        watch(() => props.material, (material, oldMaterial) => {
            if (material) {
                changMaterial(material)
            }
        })
        watch(() => props.disabled, (val) => {
            if (!val && props.material) {
                changMaterial(props.material)
            }
        })
        onUnmounted(() => {
            remove()
        })
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
