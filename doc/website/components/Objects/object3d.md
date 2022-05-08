| 属性名     | 是否必须 |  默认值 |                  属性描述 |
| ---------- | :------: | ------: | ------------------------: |
| name       |  false   |      "" |                  物体名称 |
| position   |  false   | [0,0,0] |                      位置 |
| rotate     |  false   | [0,0,0] |                      旋转 |
| scale      |  false   | [1,1,1] |                      缩放 |
| translateX |  false   |       0 |           沿着 X 轴将平移 |
| translateY |  false   |       0 |           沿着 Y 轴将平移 |
| translateZ |  false   |       0 |           沿着 Z 轴将平移 |
| rotateX    |  false   |       0 |         以 X 为轴旋转物体 |
| rotateY    |  false   |       0 |         以 Y 为轴旋转物体 |
| rotateZ    |  false   |       0 |         以 Z 为轴旋转物体 |
| positionX  |  false   |       0 |  对象局部 X 位置 绝对位置 |
| positionY  |  false   |       0 |  对象局部 Y 位置 绝对位置 |
| positionZ  |  false   |       0 |  对象局部 Z 位置 绝对位置 |
| rotationX  |  false   |       0 |      以 X 为轴旋 绝对位置 |
| rotationY  |  false   |       0 |      以 Y 为轴旋 绝对位置 |
| rotationZ  |  false   |       0 |      以 Z 为轴旋 绝对位置 |
| scaleX     |  false   |       1 |       物体 X 轴的局部缩放 |
| scaleY     |  false   |       1 |       物体 Y 轴的局部缩放 |
| scaleZ     |  false   |       1 |       物体 Z 轴的局部缩放 |
| scaleXYZ   |  false   |       1 | 物体 XYZ 轴的一起局部缩放 |
| visible    |  false   |    true |              物体是否可见 |

::: warning 以 translateX 为例，第一次赋值 1 ，第二次赋值 2，当前位置为 3， 位置等于每次赋值相加。非绝对位置都是累加的 :::
