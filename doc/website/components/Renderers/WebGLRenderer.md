
# WebGLRenderer

此组件内部生成一个 canvas 节点。
::: warning
组件必须赋予其属性 width height，否则无法显示.
:::

<demo src="./WebGLRenderer.vue" />

| 属性名        | 是否必须           | 默认值  |含义  |
| ------------- |:-------------:| -----:| -----:|
| width          | Yes | 1000 | 渲染器宽 |
| height      | Yes      |   1000  |渲染器高|
| pixelRatio      | No      |   window.devicePixelRatio  |设备像素比|
| backgroundColor      | No      |   0x000000  |渲染器背景颜色|
| backgroundAlpha      | No      |   1  |渲染器背景透明度|
| parameters | No      |    详见下文 ||


# parameters
- canvas
一个供渲染器绘制其输出的canvas 它和下面的domElement属性对应。 如果没有传这个参数，会创建一个新canvas
- context - 可用于将渲染器附加到已有的渲染环境(RenderingContext)中。默认值是null
- precision - 着色器精度. 可以是 "highp", "mediump" 或者 "lowp". 如果设备支持，默认为"highp" . 点击here 查看"应该避免的事"
- alpha - canvas是否包含alpha (透明度)。默认为 false
- premultipliedAlpha - renderer是否假设颜色有 premultiplied alpha. 默认为true
- antialias - 是否执行抗锯齿。默认为false.
- stencil - 绘图缓存是否有一个至少8位的模板缓存(stencil buffer)。默认为true
- preserveDrawingBuffer -是否保留缓直到手动清除或被覆盖。 默认false.
- powerPreference - 提示用户代理怎样的配置更适用于当前WebGL环境。 可能是"high-performance", "low-power" 或 "default"。默认是"default". 详见WebGL spec
- failIfMajorPerformanceCaveat - 检测渲染器是否会因性能过差而创建失败。默认为false。详见 WebGL spec for details.
- depth - 绘图缓存是否有一个至少6位的深度缓存(depth buffer )。 默认是true.
- logarithmicDepthBuffer - 是否使用对数深度缓存。如果要在单个场景中处理巨大的比例差异，就有必要使用。 Note that this setting uses gl_FragDepth if available which disables the Early Fragment Test optimization and can cause a decrease in performance. 默认是false。 示例：camera / logarithmicdepthbuffer