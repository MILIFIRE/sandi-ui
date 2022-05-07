<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionY="0" :positionZ="3" />
        <SDScene>
            <SDMesh :rotationY="v" :position="[x, 0, 0]" :scaleXYZ="1" :onClick="() => {
                v += 0.25;
            }" :onGLKeyDown="evevtHandle">
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
        </SDScene>
    </SDWebglRenderer>
</template>
<script setup >
import { ref } from 'vue'
const v = ref(0)
const x = ref(0)
const evevtHandle = (event) => {
    const { code } = event;
    switch (code) {
        case "KeyA":
            x.value -= 1
            break
        case "KeyD":
            x.value += 1
            break
    }
} 
</script>