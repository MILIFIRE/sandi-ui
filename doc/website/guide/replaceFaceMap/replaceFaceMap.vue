<script setup lang="ts">
import { ref } from "vue";
const rY = ref(0)
const flag = ref(false);

const render = () => {
    // rY.value += 0.015
}
</script>

<template>
    <el-button
      @click="
        () => {
          flag = !flag;
        }
      "
      >点击三弟变脸</el-button
    >
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1" :backgroundAlpha="0.5"
        :renderCallback="render">
        <SDPerspectiveCamera :positionX="2.8" :positionY="5" :positionZ="16" :rotationX="1" :rotationY="0.01"
            :rotationZ="0.08" />
        <SDOrbitControls />
        <SDScene>
            <SDTransformControls />
            <SDGroup :positionY="-7" :rotationY="rY">
                <SDFBXLoader url="/fbx/Rumba Dancing.fbx">
                    <SDMeshBasicMaterial meshName="body1">
                        <SDTextureLoader url="/img/zhangfei.jpg" type="map" />
                    </SDMeshBasicMaterial>
                    <SDMeshBasicMaterial meshName="face">
                        <SDTextureLoader url="/img/face.png" type="map"  :disabled="!flag" />
                        <SDTextureLoader url="/img/cry.png" type="map"  :disabled="flag" />
                    </SDMeshBasicMaterial>
                    <SDAnimationMixer>
                        <SDAnimationAction />
                    </SDAnimationMixer>
                </SDFBXLoader>
            </SDGroup>
        </SDScene>
    </SDWebglRenderer>
</template>

