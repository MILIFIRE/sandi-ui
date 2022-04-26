# 安装

## npm 方式
```javascript
pnpm install sand-ui
```
## vue 使用  

此方法会注册为全局组件
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import sandiUI from "sand-ui"
const app = createApp(App)
app.use(sandiUI)
app.mount('#app')
```

