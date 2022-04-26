<script  lang="ts">
import { defineComponent, toRefs, onBeforeMount, onMounted, onUnmounted, ref, provide } from 'vue';
import  useGLTFLoader from './gltf-loader'

export default defineComponent({
    props: {
        url: {
            type: String,
            required:true

        }
    },
     setup(props) {
        const {instance} = useGLTFLoader(props.url)

        return { instance }
    }
})

</script>

<template>
    <slot></slot>
</template>

<style scoped>
</style>
