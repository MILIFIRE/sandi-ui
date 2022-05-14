import installerComponents from './defaults'
import components from './component'

import type { App } from 'vue';
import v3dCore from '@sandi-ui/core';
export * from '@sandi-ui/components'
export * from "@sandi-ui/enum"
export * from "@sandi-ui/hooks"
const installer = (app: App) => {
    const v3dCoreInstance = new v3dCore();
    app.config.globalProperties.$getv3dCore = () => v3dCoreInstance;
    installerComponents(components).install(app)
}
export default installer