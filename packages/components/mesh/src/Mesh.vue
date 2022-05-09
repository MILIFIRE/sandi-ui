<script   lang="ts">
import { Material, BufferGeometry, Mesh } from "three";
import useMesh from "./mesh";
import { object3dProps, propsWatch, watchEvent, eventProps } from "../../object3d/props";
import { defineComponent, onUnmounted, watch, type PropType } from "vue";
export default defineComponent({
    props: {
        ...object3dProps,
        ...eventProps,
        geometry: {
            type: BufferGeometry,
            required: false,
        },
        material: {
            type: Material,
            required: false,
        },
        geometryType: {
            type: String,
            required: false,
        },
        geometryParam: {
            type: Object,
            required: false,
        }
    },
    setup(props) {
        const { getInstance, update, changGeometry, ChangMaterial, remove, id } = useMesh(
            props.geometry,
            props.material,
            props.geometryType,
            props.geometryParam,
        );
        let watchStopSet = propsWatch(props, getInstance());
        const updateWatch = (instance: Mesh<BufferGeometry, Material>) => {
            watchStopSet()
            watchStopSet = propsWatch(props, instance);

        };
        let removeEvent = watchEvent(props, id)

        watch(() => props.geometry, (val) => {
            if (val) changGeometry(val);
        })
        watch(() => props.material, (val) => {
            if (val) ChangMaterial(val);
        })

        update(updateWatch);
        onUnmounted(() => { remove(); removeEvent(),watchStopSet() });
        return { getInstance };
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
