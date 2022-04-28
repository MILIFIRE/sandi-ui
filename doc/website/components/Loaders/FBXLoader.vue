<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";

const value1 = ref(1);
const value3 = ref(1);
const color = ref(0x1232131);
const state = ref("play");
const flag = ref(false);
</script>

<template>
    <div class="slider-demo-block">
        <span class="demonstration">混入</span>
        <el-slider v-model="value1" :max="1" :min="0" :step="0.001" />
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">时间缩放</span>
        <el-slider v-model="value3" :max="1" :min="0" :step="0.01" />
    </div>

    <el-button @click="
        () => {
            flag = !flag;
        }
    ">三弟变脸</el-button>
    <el-button @click="
        () => {
            state = 'play';
            3;
        }
    ">play</el-button>
    <el-button @click="
        () => {
            state = 'stop';
        }
    ">stop</el-button>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1" :backgroundAlpha="0.5">
        <SDPerspectiveCamera :positionX="0.5" :positionY="7.8" :positionZ="16.9" />
        <SDOrbitControls />
        <SDScene>
            <SDGroup :scaleXYZ="0.5" :positionX="0">
                <SDFBXLoader :url="$withBase('/fbx/Rumba Dancing.fbx')">
                    <SDMeshBasicMaterial meshName="body1">
                        <SDTextureLoader :url="$withBase('/img/zhangfei.jpg')" type="map" />
                    </SDMeshBasicMaterial>
                    <SDMeshBasicMaterial meshName="face">
                        <SDTextureLoader :url="$withBase('/img/crate.gif')" type="map" :disabled="!flag" />
                        <SDTextureLoader :url="$withBase('/img/face.png')" type="map" :disabled="flag" />
                    </SDMeshBasicMaterial>
                    <SDAnimationMixer>
                        <SDAnimationAction :id="0" :weight="value1" :statue="state" :timeScale="value3" />
                    </SDAnimationMixer>
                </SDFBXLoader>
            </SDGroup>
        </SDScene>
    </SDWebglRenderer>
</template>

<style>
.slider-demo-block {
    display: flex;
    align-items: center;
}

.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
}

.slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
}

.slider-demo-block .demonstration+.el-slider {
    flex: 0 0 70%;
}
</style>
