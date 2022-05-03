<script   lang="ts">
import { Light } from "three";
import useLight from "./light";
import { object3dProps, propsWatch } from "../../object3d/props";
import { defineComponent, onUnmounted, watch } from "vue";
export default defineComponent({
    props: {
        ...object3dProps,
        light: {
            type: Light,
            required: true,
        }
    },
    setup(props) {
        const { changLight, remove } = useLight(props.light)
        let unwatchAll = propsWatch(props, props.light)
        watch(() => props.light, (light, oldMaterial) => {
            if (light) {
                changLight(light)
                unwatchAll()
                unwatchAll = propsWatch(props, props.light)
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
