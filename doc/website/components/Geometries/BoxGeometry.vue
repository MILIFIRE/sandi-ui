<template>
    <div class="slider-demo-block">
      <span class="demonstration">width</span>
      <el-slider v-model="width" :max="3" :min="1" :step="0.01" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">height</span>
      <el-slider v-model="height" :max="3" :min="1" :step="0.01" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">depth</span>
      <el-slider v-model="depth" :max="3" :min="1" :step="0.01" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">widthSegments</span>
      <el-slider v-model="widthSegments" :max="100" :min="1" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">heightSegments</span>
      <el-slider v-model="heightSegments" :max="100" :min="1" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">depthSegments</span>
      <el-slider v-model="depthSegments" :max="100" :min="1" :step="1" />
    </div>
    <SDWebglRenderer :width="500" :height="500">
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
          <SDBoxGeometry
            :width="width"
            :height="height"
            :depth="depth"
            :widthSegments="widthSegments"
            :heightSegments="heightSegments"
            :depthSegments="depthSegments"
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
    const width = ref(1);
    const height = ref(1);
    const depth = ref(1);
    const widthSegments = ref(1);
    const heightSegments = ref(1);
    const depthSegments = ref(1);
    setInterval(() => {
      r.x += 0.005;
      r.y += 0.005;
      r.z += 0.005;
    }, 20);

    return {
      r,
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
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
