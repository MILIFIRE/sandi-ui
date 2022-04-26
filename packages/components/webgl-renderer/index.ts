import { installComponentWrap } from '@sandi-ui/utils'

import WebglRenderer from './src/WebglRenderer.vue'

export const SDWebglRenderer = installComponentWrap("SDWebglRenderer", WebglRenderer)
export default SDWebglRenderer
export * from './src/webgl-renderer'
