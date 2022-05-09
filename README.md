# sand-ui

[中文](https://github.com/MILIFIRE/sandi-ui/blob/beta/README.md)｜[English](https://github.com/MILIFIRE/sandi-ui/blob/beta/README_EN.md)

## 简介

基于 three 编写的 带有事件系统的 vue3 组件库，用组件方式构建你的交互的 3D 世界

## 功能

### 事件系统

```html
<SDGroup :onClick="() => { v1 += 0.5 }"></SDGroup>
```

你可以使用 在 Mesh 和 SDGroup 等物体组件上使用 :onclick 绑定点击事件
目前支持事件
onClick,
onPointerOver,
onPointerOut,
onPointerMove,
onPointerDown,
onPointerUp,
onWheel,
onDblClick",
onPointerMissed",
onKeyMissed,
None,
onKeyDown,
onKeyup,
onKeypress,
onContextmenu

### 接触检测

```html
<SDRaycaster
  :lockDirection="true"
  :helper="true"
  :direction="new Vector3(-1, 0.5, 0)"
  :raycasterCallback="consoleRay"
  :far="4"
  :offset="new Vector3(0, 0, 0)"
/>
```

使用 SDRaycaster 组件检测是否有物体接触，你可以做出很有意思的交互 demo

### CSS2D 支持

可以做出信息点等好玩的交互啊

### 高级组件

SDLight、 SDMaterial、 SDMesh、SDGeometry 等组件可以支 threejs 实例注入

### 动画系统

SDAnimationAction SDAnimationMixer 组件 控制 FBX GLTF 文件的动画播放

### 控制器

SDOrbitControls、SDTransformControls、SDPointerLockControls 等 快速提供 360 度观察，移动缩放控制，第一人称控制

### 资源自动回收

vue 生命周期，当组件卸载时，会自动回收资源

## 文档地址

https://milifire.github.io/sandi-ui/


逐渐完善中， 里面有的例子，供你参考

## 快速开始

### 安装

pnpm

```js
pnpm install sandi-ui
```

yarn

```js
yarn add sandi-ui
```

npm

```js
npm install sandi-ui
```

### 使用

```js
import { createApp } from "vue";
import App from "./App.vue";
import sandiUI from "sandi-ui";
const app = createApp(App);
app.use(sandiUI);
app.mount("#app");
```

### 例子

```html
<template>
  <SDWebglRenderer :width="800" :height="400">
    <SDScene>
      <SDPerspectiveCamera :positionZ="20" :positionY="6" />
      <SDFBXLoader url="/fbx/Rumba Dancing.fbx">
        <SDMeshBasicMaterial meshName="body1">
          <SDTextureLoader url="img/zhangfei.jpg" type="map" />
        </SDMeshBasicMaterial>
        <SDMeshBasicMaterial meshName="face">
          <SDTextureLoader url="img/face.png" type="map" />
        </SDMeshBasicMaterial>
        <SDAnimationMixer>
          <SDAnimationAction />
        </SDAnimationMixer>
      </SDFBXLoader>
    </SDScene>
  </SDWebglRenderer>
</template>
```

![Image text](https://raw.githubusercontent.com/MILIFIRE/sandi-ui/beta/public/sandi.gif)
