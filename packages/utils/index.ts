import type { Plugin } from "vue";;
import { getCurrentInstance } from "vue";
import type v3dCore from "@sandi-ui/core"
type SFCInstallWrap<T> = T & Plugin
export const installComponentWrap = <T>(name: string, component: T) => {
    (component as SFCInstallWrap<T>).install = (app): void => {
        app.component(name, component)
    }
    return component as any
}
export const getCore = () => {
    const vm = getCurrentInstance();
    if (vm) {
        return vm.appContext.config.globalProperties.$getv3dCore() as v3dCore
    } else {
        throw Error('Sandi-ui:Core实例获取错误')
    }
}
export const getNow = (): number => {
    return (typeof performance === 'undefined' ? Date : performance).now();
}