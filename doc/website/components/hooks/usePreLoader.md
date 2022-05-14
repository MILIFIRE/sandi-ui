# usePreLoader 资源预加载，
> 任意组件内使用，后面考虑资源缓存问题
```js
usePreLoader(
  ["/img/crate.gif","/img/crate1.gif"],
  () => {
    console.log("success");
  },
  () => {
    console.log("prograss");
  },
  () => {
    console.log("onError");
  }
);
```

