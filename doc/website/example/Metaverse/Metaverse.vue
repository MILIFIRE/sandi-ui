<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1" :renderCallback="render">
        <SDPerspectiveCamera :positionY="0" :positionZ="3" />
        <SDScene>
            <SDMesh name="left" :rotation="[0, y1, 0]" :position="[-2, 0, 0]" :scaleXYZ="1">
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
            <SDMesh :position="[0, 0, 0]" :rotation="[0, y, 0]" :scaleXYZ="1">
                <SDRaycaster :lockDirection="true" :helper="{ color: 'red' }" :direction="new Vector3(1, 0, 0)" :far="2"
                    :offset="new Vector3(0, 0, 0)" :raycasterCallback="testObject" />
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
            <SDMesh name="right" :scale="[scale, scale, scale]" :position="[2, 0, 0]" :scaleXYZ="1">
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
import { Vector3 } from "three"
const y = ref(0)
const y1 = ref(0)
const touch = ref(false)
const scale = ref(1)
const render = () => {
    y.value += 0.025
    touch.value = false
    scale.value -= 0.0005
}

const testObject = (object) => {
    if (object.name === "left") {
        y1.value += 0.09
    }
    if (object.name === "right") {
        scale.value += 0.012

    }
}
</script>