<template>
    <SDWebglRenderer :width="500" :height="500">
      <SDPerspectiveCamera
        :positionX="0"
        :positionY="2"
        :positionZ="4"
        :fov="45"
        :near="1"
        :far="2000"
        :rotateX="-0.3"
      />
      <SDOrbitControls />
      <SDScene>
        <SDMesh :translateX="0">
          <SDBoxGeometry :width="1" />
          <SDMeshBasicMaterial></SDMeshBasicMaterial>
        </SDMesh>
      </SDScene>
    </SDWebglRenderer>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.button {
  padding: 6px 24px;
}
</style>
