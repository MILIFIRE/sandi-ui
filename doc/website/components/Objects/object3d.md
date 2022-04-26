| 属性名        | 是否必须           | 默认值  |属性描述|
| ------------- |:-------------:| -----:|-----:|
| translateX      | false | 0 |沿着X轴将平移 |
| translateY      | false    |  0 |沿着Y轴将平移|
| translateZ | false   |    0 |沿着Z轴将平移|
| rotateX | false   |    0 |以X为轴旋转物体|
| rotateY | false   |    0 |以Y为轴旋转物体|
| rotateZ | false   |    0 |以Z为轴旋转物体|
| positionX | false   |    0 |对象局部X位置 绝对位置|
| positionY | false   |    0 |对象局部Y位置 绝对位置|
| positionZ | false   |    0 |对象局部Z位置 绝对位置|
| rotationX | false   |    0 |以X为轴旋 绝对位置|
| rotationY | false   |    0 |以Y为轴旋 绝对位置|
| rotationZ | false   |    0 |以Z为轴旋 绝对位置|
| scaleX | false   |    1 |物体X轴的局部缩放 |
| scaleY | false   |    1 |物体Y轴的局部缩放|
| scaleZ | false   |    1 |物体Z轴的局部缩放|
| scaleXYZ | false   |    1 |物体XYZ轴的一起局部缩放|
| visible | false   |    true |物体是否可见|

::: warning
以 translateX 为例，第一次赋值 1 ，第二次赋值2，当前位置为3， 位置等于每次赋值相加。非绝对位置都是累加的
:::