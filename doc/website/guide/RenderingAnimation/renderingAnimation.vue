<script setup lang="ts">
import { ref } from "vue";
const state = ref("play");
const value1 = ref(1);
const value3 = ref(1);
const rY = ref(0)
const render = () => {
    rY.value += 0.015
}
</script>

<template>
    <div class="slider-demo-block">
        <span class="demonstration">动作混合比例</span>
        <el-slider v-model="value1" :max="1" :min="0" :step="0.001" />
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">时间缩放</span>
        <el-slider v-model="value3" :max="1" :min="0" :step="0.01" />
    </div>
    <el-button @click="
        () => {
            state = 'play';
            3;
        }
    ">播放动画</el-button>
    <el-button @click="
        () => {
            state = 'stop';
        }
    ">停止动画</el-button>
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

                    <SDAnimationMixer>
                        <SDAnimationAction :statue="state" :weight="value1" :timeScale="value3" />
                    </SDAnimationMixer>
                </SDFBXLoader>
            </SDGroup>
        </SDScene>
    </SDWebglRenderer>
</template>

