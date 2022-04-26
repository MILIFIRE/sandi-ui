# mesh

基于三角形为polygon mesh（多边形网格）的物体的, 由几何体和材质组成.子组件为，几何体和材质
::: tip
Mesh组件和Group 组件可以互相嵌套
:::

```html
      <SDMesh >
        <SDBoxGeometry :width="1" />
        <SDMeshBasicMaterial :color="0x2ed839"></SDMeshBasicMaterial>
      </SDMesh>
```
