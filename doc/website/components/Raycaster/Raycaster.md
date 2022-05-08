# Raycaster

| 属性名 | 是否必须 | 默认值 | 含义 |
| --- | --: | --: | --: |
| origin | No | Vector3(0，0，0) | 原点，目前默认和父级物体 postion 绑定 |
| offset | No | Vector3(0，0，0) | 相对 origin 偏移量 |
| direction | No | Vector3(0，1，0) | 射线的方向 |
| near | No | 0 | 最近点，near 不能为负值，其默认值为 0。 |
| far | No | Infinity | 最远点，far 不能小于 near，其默认值为 Infinity。 |
| disabled | No | 0 | 禁用检测，用于临时性关闭 |
| raycasterCallback | No | (target:object3d) => { } | 检测到物体回调 |
| lockDirection | No | true | 和物体的旋转方向锁定，和物体一起旋转 |
| helper | No | "{color: "red", headLength: 1, headWidth: 1}" | 射线显示出来,默认是看不到的 |
