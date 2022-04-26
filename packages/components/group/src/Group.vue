<script   lang="ts">
import { Material, BufferGeometry } from "three";
import useGroup from "./group";
import { object3dProps, propsWatch } from "../../object3d/props";
import { defineComponent, onUnmounted } from "vue";
export default defineComponent({
  props: {
    ...object3dProps,
  },
  setup(props) {
    const { getInstance } = useGroup();
    getInstance().position.set(0, 0, 0);
    propsWatch(props, getInstance());
    onUnmounted(() => {});
  },
});
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>
