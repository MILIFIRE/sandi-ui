import { installComponentWrap } from '@sandi-ui/utils'

import FBXLoader from './src/FBXLoader.vue'

export const SDFBXLoader = installComponentWrap('SDFBXLoader', FBXLoader)
export default SDFBXLoader
export * from './src/fbx-loader'
