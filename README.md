# sand-ui

## 简介
基于three编写的vue3组件，用组件方式构建你的3D世界。

## 文档地址
https://milifire.github.io/sandi-ui/

国内服务器:http://152.136.110.22/ (域名正在备案)

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
import { createApp } from 'vue'
import App from './App.vue'
import sandiUI from "sand-ui"
const app = createApp(App)
app.use(sandiUI)
app.mount('#app')
```