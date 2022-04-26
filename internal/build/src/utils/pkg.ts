const PKG_PREFIX = "@sandi-ui"
import { buildConfig } from '../build-info'

import type { Module } from '../build-info'

export const pathRewriter = (module: Module) => {
    const config = buildConfig[module]
    return (id: string) => {
        id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
        return id
    }
}
