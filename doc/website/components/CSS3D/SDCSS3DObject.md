# SDCSS2DObject

| 属性名   | 是否必须 |  默认值 | 含义 |
| -------- | :------: | ------: | ---: |
| position   |  false   | [0,0,0] |                      位置 |
| rotate     |  false   | [0,0,0] |                      旋转 |
| scale      |  false   | [1,1,1] |                      缩放 |

此组件 放在物体组件物体下面 可以物体位置绑定，子组件为 vue 组件,

::: warin 
    此组件生效必须 webglrender 必须开启 css3D
:::

::: warin 
  由于 CSS3D 元素的大小以像素为单位， Object3D 元素的大小以抽象的“单位”为单位，会被放大10倍， 需要缩放0.1
:::


```html
<SDMesh name="left" :rotation="[0, y1, 0]" :position="[-2, 0, 0]" :scaleXYZ="1">
  <SDCSS3DObject :style="{background:'red'}" :position="[0, 1, 0]"  :scale="[0.1,0.1,0.1]">
    <div class="label">{{ text }}</div>
  </SDCSS3DObject>
  <SDBoxGeometry :width="1" />
  <SDMeshBasicMaterial>
    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
  </SDMeshBasicMaterial>
</SDMesh>
```
