<template>
    <div class="slider-demo-block">
      <span class="demonstration">radius</span>
      <el-slider v-model="radius" :max="3" :min="1" :step="0.01" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">length</span>
      <el-slider v-model="length" :max="3" :min="1" :step="0.01" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">capSubdivisions</span>
      <el-slider v-model="capSubdivisions" :max="100" :min="1" :step="1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">radialSegments</span>
      <el-slider v-model="radialSegments" :max="100" :min="4" :step="1" />
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
          <SDCapsuleGeometry
            :radius="radius"
            :length="length"
            :capSubdivisions="capSubdivisions"
            :radialSegments="radialSegments"
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
    const radius = ref(1);
    const length = ref(1);
    const capSubdivisions = ref(20);
    const radialSegments = ref(20);

    setInterval(() => {
      r.x += 0.005;
      r.y += 0.005;
      r.z += 0.005;
    }, 20);

    return {
      r,
      radius,
      length,
      capSubdivisions,
      radialSegments,
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
