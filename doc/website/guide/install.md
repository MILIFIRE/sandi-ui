# 安装

## npm 方式
```javascript
pnpm install sandi-ui
```
## vue 使用  

此方法会注册为全局组件
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import sandiUI from "sandi-ui"
const app = createApp(App)
app.use(sandiUI)
app.mount('#app')
```

