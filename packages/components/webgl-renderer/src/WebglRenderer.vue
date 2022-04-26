<script lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    watch,
    computed,
    defineComponent,
    toRefs,
} from "vue";
import { useRender, webglProps } from "./webgl-renderer";
export default defineComponent({
    props: webglProps,
    setup(props) {
        const rendererDom = ref<HTMLDivElement>();
        const webglRender = useRender(props.options);
        const { instance, setSize } = webglRender;
        setSize(props.width, props.height);
        instance.setClearColor(props.backgroundColor, props.backgroundAlpha);
        instance.setPixelRatio(props.pixelRatio);
        if (props.renderCallback) {
            instance.setCallBack(props.renderCallback);
        }
        watch(
            () => props.renderCallback,
            (fn, oldFN) => {
                if (fn) {
                    instance.setCallBack(fn);
                }
                if (oldFN) {
                    instance.delCallBack(oldFN);
                }
            }
        );
        watch(
            () => props.scene,
            (scene) => {
                if (scene) instance.setScene(scene);
            }
        );
        watch(
            () => props.camera,
            (camera) => {
                if (camera) instance.setCamera(camera);
            }
        );

        computed(() => {
            setSize(props.width, props.height);
        });
        computed(() => {
            instance.setClearColor(props.backgroundColor, props.backgroundAlpha);
        });

        watch(
            () => props.pixelRatio,
            (pixelRatio) => {
                3;
                instance.setPixelRatio(pixelRatio);
            }
        );

        onMounted(() => {
            if (props.renderCallback) instance.delCallBack(props.renderCallback)
            rendererDom.value?.appendChild(instance.domElement);
            instance.renderScene();
        });
        onUnmounted(() => {
            instance.dispose();
        });
        const { width, height } = toRefs(props);
        return { rendererDom, width, height };
    },
});
</script>

<template>
    <div ref="rendererDom" :style="{ width: width + 'px', height: height + 'px' }">
        <slot></slot>
    </div>
</template>

<style scoped>
</style>
