<script setup lang="ts">
import { ref } from "vue";
const lock = ref(false);
const getXZ = () => Math.floor(Math.random() * 20 - 10) * 20
const getY = () => Math.floor(Math.random() * 20) * 20 + 10
</script>

<template>
    <SDWebglRenderer :width="862" :height="400" :backgroundColor="0x1f63d1" :backgroundAlpha="0.5" @click="() => {
        lock = true
    }">
        <!-- <SDOrbitControls /> -->
        <SDPointerLockControls :lock="lock" :unlockCallback="() => {
            lock = false
        }" :options="{ junpHeight: 300, characterHeight: 10, moveScale: 400, mass: 100, movingResistance: 10 }" />
        <SDScene>
            <SDPerspectiveCamera :positionY="0" />
            <SDMesh :rotationX="- Math.PI / 2">
                <SDPlaneGeometry :width="2000" :height="2000" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
            <SDMesh v-for=" (_, index) in new Array(500).fill(1) " :positionX="getXZ()" :positionY="getY()"
                :positionZ="getXZ()">
                <SDBoxGeometry :width="20" :height="20" :depth="20" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
        </SDScene>
    </SDWebglRenderer>
</template>
