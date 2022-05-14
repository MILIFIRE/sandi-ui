# useFrame 渲染器回调 

> 在任意组件内使用，会自动找到最近的渲染器

两个参数 
```js 
useFrame((delta?: number, time?: number) => {
    // do sonthing
    // play animation 
    // object rotation
}) 
```