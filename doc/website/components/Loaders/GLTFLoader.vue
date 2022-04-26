<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";

const value1 = ref(1);
const value2 = ref(3);
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
      <span class="demonstration">动作</span>
      <el-slider v-model="value2" :max="6" :min="0" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">时间缩放</span>
      <el-slider v-model="value3" :max="1" :min="0" :step="0.01" />
    </div>
    <!-- <div class="slider-demo-block">
    <span class="demonstration">颜色</span>
    <el-slider v-model="color" :max="100000" :min="0" :step="0.01" />
  </div> -->
    <el-button
      @click="
        () => {
          flag = !flag;
        }
      "
      >贴图切换</el-button
    >
    <el-button
      @click="
        () => {
          state = 'play';
          3;
        }
      "
      >play</el-button
    >
    <el-button
      @click="
        () => {
          state = 'stop';
        }
      "
      >stop</el-button
    >
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
    <SDWebglRenderer :width="700" :height="500">
      <SDPerspectiveCamera :positionX="10" :positionY="5" :positionZ="5" />
      <SDOrbitControls />
      <!-- <Camera ref="camera" /> -->
      <SDScene>
        <SDTransformControls />

        <SDDirectionalLight
          :color="0xffffff"
          :intensity="2"
        ></SDDirectionalLight>
        <SDGroup :scaleXYZ="1.5">
          <SDMesh>
            <SDMeshBasicMaterial>
              <SDTextureLoader
                url="/img/crate.gif"
                type="map"
                :disabled="flag"
              />
              <SDTextureLoader
                url="/img/zhangfei.jpg"
                type="map"
                :disabled="!flag"
              />
            </SDMeshBasicMaterial>
            <SDGroup :positionY="0.5">
              <SDGLTFLoader url="/gltf/Xbot.glb">
                <SDAnimationMixer>
                  <SDAnimationAction
                    :id="value2"
                    :weight="value1"
                    :statue="state"
                    :timeScale="value3"
                  />
                </SDAnimationMixer>
              </SDGLTFLoader>
            </SDGroup>
          </SDMesh>
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
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
