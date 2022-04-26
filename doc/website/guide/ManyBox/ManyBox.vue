<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionX="0.5" :positionY="4" :positionZ="3" />
        <SDOrbitControls />
        <SDScene>
            <SDTransformControls />
            <WrapMesh :positionX="-2" :scaleXYZ="2"/>
            <WrapMesh :positionX="2"  :scaleXYZ="2"/>
        </SDScene>
    </SDWebglRenderer>
</template>

<script setup lang="ts">
import WrapMesh from "./WrapMesh.vue";

</script>