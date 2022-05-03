<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionX="0.5" :positionY="0" :positionZ="16.9" />
        <SDOrbitControls />
        <SDScene>
            <SDRaycaster :raycasterCallback="log" mode="scanAndClick" />
            <SDGroup :rotationY="v" :scaleXYZ="s" :click="() => {
                v += 0.5
            }" :pointerOver="() => { s = 8 }" :pointerOut="() => { s += 5 }">
                <SDMesh :click="() => {
                    v += 0.05
                    return false
                }">
                    <SDBoxGeometry :width="1" />
                    <SDMeshBasicMaterial>
                        <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                    </SDMeshBasicMaterial>
                </SDMesh>
            </SDGroup>
            <SDGroup :scaleXYZ="0.01">
                <SDFBXLoader url="/sandi-ui/fbx/food-store-environment-diorama.fbx">
                </SDFBXLoader>
            </SDGroup>
            <SDMesh :rotationY="v1" :scaleXYZ="5" :positionX="10" :click="() => {
                v1 += 0.5
            }">
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
const log = (a, b, c) => {
    console.log(a, b, c)
}
const v = ref(4)
const v1 = ref(4)
const s = ref(5)
const clicka = () => {
    console.log('click')
    v.value += 0.05
    return false
}
</script>