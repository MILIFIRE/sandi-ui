<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";
</script>

<template>
    <SDWebglRenderer
      :width="720"
      :height="360"
      :backgroundColor="0x1f63d1"
      :backgroundAlpha="0.5"
    >
      <SDPerspectiveCamera
        :positionX="0.5"
        :positionY="7.8"
        :positionZ="16.9"
      />
      <SDOrbitControls />
      <SDScene>
        <SDTransformControls />
        <SDMesh :scaleXYZ="5">
          <SDBoxGeometry :width="1" />
          <SDMeshBasicMaterial>
            <SDTextureLoader url="/img/crate.gif" type="map" />
          </SDMeshBasicMaterial>
        </SDMesh>
      </SDScene>
    </SDWebglRenderer>
</template>

<style>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
