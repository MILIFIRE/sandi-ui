<script   lang="ts">
import { onMounted, defineComponent, watch, onUnmounted } from "vue";
import type { PropType } from "vue";
import useOrbitControls from "./orbit-controls";
import { MOUSE, Camera, Vector3 } from "three";
export default defineComponent({
    props: {
        camera: {
            type: Camera,
            required: false,
        },
        domElement: {
            type: Object as PropType<HTMLCanvasElement>,
            required: false,
        },
        autoRotate: {
            type: Boolean,
            required: false,
            default: false
        },
        autoRotateSpeed: {
            type: Boolean,
            required: false,
            default: false
        },
        dampingFactor: {
            type: Number,
            required: false,
            default: 0.5
        },
        enabled: {
            type: Boolean,
            required: false,
            default: true
        },
        enableDamping: {
            type: Boolean,
            required: false,
            default: false
        },
        enablePan: {
            type: Boolean,
            required: false,
            default: true
        },
        enableRotate: {
            type: Boolean,
            required: false,
            default: true
        },
        enableZoom: {
            type: Boolean,
            required: false,
            default: true
        }, keyPanSpeed: {
            type: Number,
            required: false,
            default: 7
        },
        keys: {
            type: Object,
            required: false,
            default: {
                LEFT: 'ArrowLeft',
                UP: 'ArrowUp',
                RIGHT: 'ArrowRight',
                BOTTOM: 'ArrowDown'
            }
        },
        maxAzimuthAngle: {
            type: Number,
            required: false,
            default: Infinity
        },
        maxDistance: {
            type: Number,
            required: false,
            default: Infinity
        },
        maxPolarAngle: {
            type: Number,
            required: false,
            default: Math.PI
        },
        maxZoom: {
            type: Number,
            required: false,
            default: Infinity
        },
        minAzimuthAngle: {
            type: Number,
            required: false,
            default: Infinity
        },
        minDistance: {
            type: Number,
            required: false,
            default: 0
        },
        minPolarAngle: {
            type: Number,
            required: false,
            default: 0
        },
        minZoom: {
            type: Number,
            required: false,
            default: 0
        }, mouseButtons: {
            type: Object,
            required: false,
            default: {
                LEFT: MOUSE.ROTATE,
                MIDDLE: MOUSE.DOLLY,
                RIGHT: MOUSE.PAN
            }
        }, panSpeed: {
            type: Number,
            required: false,
            default: 1
        }, rotateSpeed: {
            type: Number,
            required: false,
            default: 1
        }, screenSpacePanning: {
            type: Boolean,
            required: false,
            default: true
        },
        target: {
            type: Vector3,
            required: false,
            default: undefined
        }, zoomSpeed: {
            type: Number,
            required: false,
            default: 1
        }
    },
    setup(props) {
        let _remove
        onMounted(() => {
            const { instance, setUpdate, remove
            } = useOrbitControls(props.camera, props.domElement);
            _remove = remove;
            watch(props, (val) => {
                if (instance) {
                    const ignore = ['camera', 'domElement']
                    let needUpdateList = ['autoRotate', 'enableDamping']
                    Object.keys(props).filter(item => !ignore.includes(item)).forEach(item => {
                        if (needUpdateList.includes(item)) {
                            if (props[item]) {
                                setUpdate(true)
                            } else {
                                needUpdateList = needUpdateList.filter(key => key != item)
                            }
                        }
                        instance[item] = props[item]
                    })
                    if (needUpdateList.length === 0) {
                        setUpdate(false)
                    }
                }
            })

            return { instance };
        });
        onUnmounted(() => {
            if (_remove) _remove()
        })
    },
});
</script>

<template>
    <div ref="rendererDom"></div>
</template>

<style scoped>
</style>
