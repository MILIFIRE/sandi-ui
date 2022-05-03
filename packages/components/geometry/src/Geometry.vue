<script   lang="ts">
import { defineComponent, watch, onUnmounted } from "vue";
import useGeometry from "./geometry";
import { BufferGeometry } from 'three'
export default defineComponent({
    props: {
        geometry: {
            type: BufferGeometry,
            required: true
        },
    },
    setup(props) {

        const { remove, changGeometry } = useGeometry(
            props.geometry
        );
        watch(() => props.geometry, (val, oldVal) => {
            changGeometry(props.geometry);
        });
        onUnmounted(() => {
            remove();
        });
    },
});
</script>

<template>
    <slot></slot>
</template>


