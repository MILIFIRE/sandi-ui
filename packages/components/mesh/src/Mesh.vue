<script   lang="ts">
import { Material, BufferGeometry, Mesh } from "three";
import useMesh from "./mesh";
import { object3dProps, propsWatch } from "../../object3d/props";
import { defineComponent, onUnmounted } from "vue";
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
  },
  setup(props) {
    const { getInstance, update } = useMesh(
      props.geometry,
      props.material,
      props.geometryType,
      props.geometryParam
    );
    let watchStopSet = propsWatch(props, getInstance());
    const updateWatch = (instance: Mesh<BufferGeometry, Material>) => {
      if (watchStopSet) {
        watchStopSet.forEach((stop) => stop());
        watchStopSet = propsWatch(props, instance);
      }
    };
    update(updateWatch);
    onUnmounted(() => {});
    return { getInstance };
  },
});
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>
