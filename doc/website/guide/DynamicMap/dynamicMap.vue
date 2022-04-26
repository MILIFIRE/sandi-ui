<script setup lang="ts">
import { ref } from "vue";

const flag = ref(true);
</script>
<template>
    <el-button @click="() => { flag = !flag; }"> 切换贴图</el-button>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionX="0.5" :positionY="4" :positionZ="16.9" />
        <SDOrbitControls />
        <SDScene>
            <SDTransformControls />
            <SDMesh :positionZ="4" :scaleXYZ="5">
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/img/crate.gif" type="map" :disabled="!flag" />
                    <SDTextureLoader url="/img/zhangfei.jpg" type="map" :disabled="flag" />
                </SDMeshBasicMaterial>
            </SDMesh>
        </SDScene>
    </SDWebglRenderer>
</template>

