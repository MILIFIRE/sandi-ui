# sand-ui

[中文](https://raw.githubusercontent.com/MILIFIRE/sandi-ui/beta/README.md)｜[English](https://raw.githubusercontent.com/MILIFIRE/sandi-ui/beta/README_EN.md)

## Introduction

Based on the vue3 component library with event system written by three, build your interactive 3D world with components

## Features

### event system

```html
<SDGroup :onClick="() => { v1 += 0.5 }"></SDGroup>
```

You can bind events on object components such as Mesh and SDGroup
Current Supported events
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

### raycaster

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

Using the SDRaycaster component to detect contact, you can make interesting interactive demos

### Advanced component

SDLight, SDMaterial, SDMesh, SDGeometry and other components can support threejS instance injection

### Animation system

The SDAnimationMixer component controls the animation playback of FBX GLTF files

### Controllers

SDOrbitControls, SDTransformControls, SDPointerLockControls and more quickly provide 360 degree view, zoom control, first person control

### Automatic Resource reclamation

Vue life cycle, when the build is uninstalled, resources are automatically reclaimed

## Documentation

https://milifire.github.io/sandi-ui/

china:http://152.136.110.22/ (The domain name is being filed)
Gradually improving, there are some examples for your reference

## fast start

### install

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

### use

```js
import { createApp } from "vue";
import App from "./App.vue";
import sandiUI from "sandi-ui";
const app = createApp(App);
app.use(sandiUI);
app.mount("#app");
```

### example

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
