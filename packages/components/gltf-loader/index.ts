import { installComponentWrap } from '@sandi-ui/utils'

import GLTFLoader from './src/GLTFLoader.vue'

export const SDGLTFLoader = installComponentWrap('SDGLTFLoader',GLTFLoader)
export default SDGLTFLoader
export * from './src/gltf-loader'
