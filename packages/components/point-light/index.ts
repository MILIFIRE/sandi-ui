import { installComponentWrap } from '@sandi-ui/utils'

import PointLight from './src/PointLight.vue'

export const SDPointLight = installComponentWrap('SDPointLight', PointLight)
export default SDPointLight
export * from './src/point-light'
