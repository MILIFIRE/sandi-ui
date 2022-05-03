<script   lang="ts">
import { Material, BufferGeometry, Mesh } from "three";
import useMesh from "./mesh";
import { object3dProps, propsWatch } from "../../object3d/props";
import { defineComponent, onUnmounted, watch, type PropType } from "vue";
export default defineComponent({
    props: {
        ...object3dProps,
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
        },
        click: {
            type: Function as PropType<() => void>,
            required: false,
        },
        pointerOver: {
            type: Function as PropType<() => void>,
            required: false,
        },
        pointerOut: {
            type: Function as PropType<() => void>,
            required: false,
        }
    },
    setup(props) {
        const { getInstance, update, changGeometry, ChangMaterial, setClick, setPointerOver, setPointerOut, remove } = useMesh(
            props.geometry,
            props.material,
            props.geometryType,
            props.geometryParam,
            props.click
        );
        let watchStopSet = propsWatch(props, getInstance());
        const updateWatch = (instance: Mesh<BufferGeometry, Material>) => {
            watchStopSet()
            watchStopSet = propsWatch(props, instance);

        };
        setClick(props.click)

        watch(() => props.geometry, (val) => {
            if (val) changGeometry(val);
        })
        watch(() => props.material, (val) => {
            if (val) ChangMaterial(val);
        })
        watch(() => props.click, (val) => {
            if (typeof val == 'function') {
                setClick(val)
            }
        })
        watch(() => props.pointerOver, (val) => {
            if (typeof val == 'function') {
                setPointerOver(val)
            }
        })
        watch(() => props.pointerOut, (val) => {
            if (typeof val == 'function') {
                setPointerOut(val)
            }
        })
        update(updateWatch);
        onUnmounted(() => { remove() });
        return { getInstance };
    },
});
</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
