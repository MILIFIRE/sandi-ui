# 创建一个箱子

## 创建渲染器
::: demo src="./CreatBox/creatRender.vue" 

此时是一片空白的，因为我们还没有添加摄像机和场景

:::

## 创建摄像机
::: demo src="./CreatBox/creatCamera.vue" 

此时还是一片空白的，因为我们还没有添加场景

:::

## 创建场景
::: demo src="./CreatBox/creatScene.vue" title="创建渲染器"

添加了场景后 有颜色，我们设置的渲染器背景色出来，渲染器组件还可以设置透明度哟

:::
## 添加箱子
::: demo src="./CreatBox/creatBox.vue" title="创建渲染器"

添加了Mesh 组件 是一个正方体的几何体组件 BoxGeometry，场景里面添加了一个立方体

:::

## 箱子贴图 
::: demo src="./CreatBox/addMap.vue" title="创建渲染器"

添加了SDMeshBasicMaterial组件后，添加一个贴图加载的子组件 设置贴图类型为map,我们就得到了一个箱子

:::

