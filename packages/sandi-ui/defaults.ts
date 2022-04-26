import type { App, Plugin } from 'vue'
const INSTALLED = Symbol('INSTALLED')
import { version } from './version'
export default (components: Plugin[] = []) => {
    const install = (app: App) => {
        if (app[INSTALLED]) return
        app[INSTALLED] = true
        components.forEach((c) => app.use(c))
    }
    return {
        version,
        install,
    }
}