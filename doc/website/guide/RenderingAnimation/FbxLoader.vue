<script setup lang="ts">
import { ref } from "vue";
const rY = ref(0)
const render = () => {
    rY.value += 0.015
}
</script>

<template>

    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1" :backgroundAlpha="0.5"
        :renderCallback="render">
        <SDPerspectiveCamera :positionX="2.8" :positionY="5" :positionZ="16" :rotationX="1" :rotationY="0.01"
            :rotationZ="0.08" />
        <SDOrbitControls />
        <SDScene>
            <SDTransformControls />
            <SDGroup :positionY="-7" :rotationY="rY">
                <SDFBXLoader url="/sandi-ui/fbx/Rumba Dancing.fbx">
                    <SDMeshBasicMaterial meshName="body1" :color="0xff0000" />
                </SDFBXLoader>
            </SDGroup>
        </SDScene>
    </SDWebglRenderer>
</template>

