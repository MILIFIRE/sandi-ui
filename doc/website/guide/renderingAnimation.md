# 创建动画模型

## 我们将加载一个动画模型
::: demo src="./RenderingAnimation/FbxLoader.vue" 

我们通过 SDFBXLoader 加载器将带有动画的模型放入 SDScene中，并使用 SDMeshBasicMaterial 赋予一个简单的材质,我们使用 SDGroup 包裹 模型 来控制 模360度旋转

:::
## 让三弟动起来

::: demo src="./RenderingAnimation/renderingAnimation.vue"

使用SDAnimationMixer 和 SDAnimationAction，
SDAnimationAction  可以来控制动作 混合比例 和 速度

:::
