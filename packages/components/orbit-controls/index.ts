import { installComponentWrap } from '@sandi-ui/utils'

import OrbitControls from './src/OrbitControls.vue'

export const SDOrbitControls = installComponentWrap("SDOrbitControls", OrbitControls)
export default SDOrbitControls
export * from './src/orbit-controls'
