# SDCSS2DObject

| 属性名   | 是否必须 |  默认值 | 含义 |
| -------- | :------: | ------: | ---: |
| position |  false   | [0,0,0] | 位置 |

此组件 放在物体组件物体下面 可以物体位置绑定，子组件为 vue 组件,

::: warin 
    此组件生效必须 webglrender 必须开启 css2D
:::

```html
<SDMesh name="left" :rotation="[0, y1, 0]" :position="[-2, 0, 0]" :scaleXYZ="1">
  <SDCSS2DObject :style="{background:'red'}" :position="[0, 1, 0]">
    <div class="label">{{ text }}</div>
  </SDCSS2DObject>
  <SDBoxGeometry :width="1" />
  <SDMeshBasicMaterial>
    <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
  </SDMeshBasicMaterial>
</SDMesh>
```
