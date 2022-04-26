<template>
    <SDWebglRenderer :width="500" :height="500">
      <SDPerspectiveCamera
        :positionX="0"
        :positionY="20"
        :positionZ="40"
        :fov="45"
        :near="1"
        :far="2000"
        :rotateX="-0.3"
      />
      <SDScene>
        <SDFBXLoader url="/fbx/Rumba Dancing.fbx">
          <SDMeshBasicMaterial meshName="body1">
            <SDTextureLoader url="/img/zhangfei.jpg" type="map" />
          </SDMeshBasicMaterial>
          <SDMeshBasicMaterial meshName="face">
            <SDTextureLoader url="/img/face.png" type="map" />
          </SDMeshBasicMaterial>
          <SDAnimationMixer>
            <SDAnimationAction />
          </SDAnimationMixer>
        </SDFBXLoader>
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
</style>
