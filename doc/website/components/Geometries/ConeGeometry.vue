<template>
    <div class="slider-demo-block">
      <span class="demonstration">radius</span>
      <el-slider v-model="radius" :max="30" :min="0" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">height</span>
      <el-slider v-model="height" :max="50" :min="1" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">radialSegments</span>
      <el-slider v-model="radialSegments" :max="8" :min="3" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">heightSegments</span>
      <el-slider v-model="heightSegments" :max="8" :min="1" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">openEnded</span>
      <el-switch
        v-model="openEnded"
        size="large"
        active-text="Open"
        inactive-text="openEnded"
      />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">thetaStart</span>
      <el-slider v-model="thetaStart" :max="6" :min="1" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">thetaLength</span>
      <el-slider
        v-model="thetaLength"
        :max="2 * Math.PI"
        :min="0"
        :step="0.001"
      />
    </div>
    <SDWebglRenderer :width="500" :height="500" :renderCallback="render">
      <SDPerspectiveCamera
        :positionX="0"
        :positionY="2"
        :positionZ="4"
        :fov="45"
        :near="1"
        :far="2000"
        :rotateX="-0.5"
      />
      <!-- <SDOrbitControls /> -->
      <SDScene>
        <SDMesh :rotationX="r.x" :rotationY="r.y" :rotationZ="r.z">
          <SDConeGeometry
            :radius="radius"
            :height="height"
            :radialSegments="radialSegments"
            :heightSegments="heightSegments"
            :openEnded="openEnded"
            :thetaStart="thetaStart"
            :thetaLength="thetaLength"
          />
          <SDMeshBasicMaterial></SDMeshBasicMaterial>
        </SDMesh>
      </SDScene>
    </SDWebglRenderer>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
export default {
  setup() {
    const r = reactive({ x: 0, y: 0, z: 0 });
    const radius = ref(3);
    const height = ref(1);
    const heightSegments = ref(8);
    const radialSegments = ref(1);
    const openEnded = ref(true);
    const thetaStart = ref(0);
    const thetaLength = ref(6);
    const render =()=>{
      r.x += 0.005;
      r.y += 0.005;
      r.z += 0.005;
    }
    return {
      r,
      render,
      radius,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    };
  },
};
</script>

<style scoped>
.button {
  padding: 6px 24px;
}
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
