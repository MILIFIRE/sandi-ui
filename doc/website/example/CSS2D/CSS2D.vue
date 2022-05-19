<script setup lang="ts">
  import { ref } from 'vue';
  const rY = ref(0);
  const render = () => {
    rY.value += 0.005;
  };
  const awei = ref(1);
  const state = ref('play');
  const value3 = ref(1);
  const step = ref(0);
  const textAry = [
    '三弟正在跳舞，鼠标放在3D身上互动一下吧',
    '三弟哭了，点击三弟开心起来吧（被碰瓷）',
    '啊 力度有点大3d 晕倒了，点击哄一下三弟吧',
    '哇开心起来了',
  ];
  const nextStep = () => {
    if (step.value == 3) {
      step.value = 0;
    } else {
      step.value += 1;
    }
  };
</script>

<template>
  <SDWebglRenderer
    :width="720"
    :height="360"
    :backgroundColor="0x1f63d1"
    :backgroundAlpha="0.5"
    :renderCallback="render"
    :css2D="true"
    :css3D="true"
  >
    <SDOrbitControls />
    <SDScene>
      <SDPerspectiveCamera :positionX="2.8" :positionY="0" :positionZ="16" />

      <SDGroup :positionY="-7" :rotation="[0, 0, 0]" :position="[0, 0, 0]" name="zhangfei">
        <SDCSS2DObject :style="{ background: 'gray' }" :position="[0, 10, 0]">
          <el-button
            @click="
              () => {
                nextStep();
              }
            "
          >
            {{ textAry[step] }}
          </el-button>
        </SDCSS2DObject>

        <SDCSS3DObject  :scale="[0.1, 0.1, 0.1]" :position="[10, 0, 0]">
          <div
            @click="
              () => {
                nextStep();
              }
            "
            :style="{ width: '100px', height: '200px' }"
          >
            这是一个 CSS3D,展示 同时渲染 dom 的3D 变换可以展示出更多的效果,完全展示事件
          </div>
        </SDCSS3DObject>
        <SDGroup
          :position="[0, 0, 0]"
          :rotation="[0, 0, 0]"
          :scale="[1, 1, 1]"
          name="zhangfei"
          :onClick="
            () => {
              nextStep();
            }
          "
          :onPointerOver="
            () => {
              if (step == 0) {
                nextStep();
              }
            }
          "
        >
          <SDGLTFLoader url="/sandi-ui/gltf/multiple.gltf">
            <SDMeshBasicMaterial meshName="body1">
              <SDTextureLoader url="/sandi-ui/img/zhangfei.jpg" type="map" />
            </SDMeshBasicMaterial>
            <SDMeshBasicMaterial meshName="face">
              <SDTextureLoader url="/sandi-ui/img/face.png" type="map" />
            </SDMeshBasicMaterial>
            <SDAnimationMixer>
              <SDAnimationAction :id="step" :weight="awei" :statue="state" :timeScale="value3" />
            </SDAnimationMixer>
          </SDGLTFLoader>
        </SDGroup>
      </SDGroup>
    </SDScene>
  </SDWebglRenderer>
</template>
