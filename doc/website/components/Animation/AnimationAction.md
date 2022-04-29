# AnimationAction 动作组件

此组件 必须为 AnimationMixer 子组件

 | 属性名        | 是否必须           | 默认值  |含义  |
| ------------- |:-------------:| -----:| -----:|
| id          | No             | 0       | 默认播放第一个动作 |
| weight       | No             |   1  |当前动作混合比例 |
| timeScale    | No             |    1|时间比例，可以做出慢动作的效果|
| loopMode     | No             |    2000 | 枚举体 LoopMode 有三种 LoopOnce 循环一次，LoopRepeat从头循环，LoopPingPong 往复循环|
| loop     | No             |    Infinity |  循环次数|
|statue   |No | 'play'| 'play' 播放 'stop' 停止 'reset' 重置|
