<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionX="0.5" :positionY="0" :positionZ="16.9" />
        <SDOrbitControls />
        <SDScene>
            <!-- <SDTransformControls /> -->
            <SDGroup :rotationY="v1" :scaleXYZ="1" :onClick="() => {
                v1 += 0.5
            }">
                <SDGroup>
                    <SDMesh :rotationY="v" :scaleXYZ="1" :onClick="() => {
                        v += 0.25; return false
                    }">
                        <SDRaycaster :lockDirection="true" :helper="true" :direction="new Vector3(-1, 0.5, 0)"
                            :raycasterCallback="consoleRay" :far="4" :offset="new Vector3(0, 0, 0)" />
                        <SDBoxGeometry :width="1" />
                        <SDMeshBasicMaterial>
                            <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                        </SDMeshBasicMaterial>
                    </SDMesh>
                    <!-- <SDFBXLoader url="/sandi-ui/fbx/Rumba Dancing.fbx">
                        <SDMeshBasicMaterial meshName="body1">
                            <SDTextureLoader url="/sandi-ui/img/zhangfei.jpg" type="map" />
                        </SDMeshBasicMaterial>
                        <SDMeshBasicMaterial meshName="face">
                            <SDTextureLoader url="/sandi-ui/img/face.png" type="map" />
                        </SDMeshBasicMaterial>
                        <SDAnimationMixer>
                            <SDAnimationAction />
                        </SDAnimationMixer>
                    </SDFBXLoader> -->
                </SDGroup>
            </SDGroup>
        </SDScene>
    </SDWebglRenderer>
</template>
<script setup >
import { ref } from 'vue'
import { Vector3 } from 'three'
const log = (a, b, c) => {
    console.log(a, b, c)
}
const v = ref(4)
const v1 = ref(0)
const s = ref(5)
const consoleRay = (a, b, c) => {
    // console.log(a, b, c)
}
// setInterval(() => {
//     v1.value += 0.05
// }, 100)
const clicka = () => {
    console.log('click')
    v.value += 0.05
    return false
}
</script>