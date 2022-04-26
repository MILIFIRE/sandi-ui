import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..','..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directiveRoot = resolve(pkgRoot, 'directives')
export const sdRoot = resolve(pkgRoot, 'sandi-ui')
export const utilRoot = resolve(pkgRoot, 'utils')
export const buildRoot = resolve(projRoot, 'internal', 'build')

// Docs
// export const docsDirName = 'docs'
// export const docRoot = resolve(projRoot, docsDirName)
// export const vpRoot = resolve(docRoot, '.vitepress')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/sandi-ui` */
export const sdOutput = resolve(buildOutput, 'sandi-ui')

export const projPackage = resolve(projRoot, 'package.json')
export const compPackage = resolve(compRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const hookPackage = resolve(hookRoot, 'package.json')
export const localePackage = resolve(localeRoot, 'package.json')
export const directivePackage = resolve(directiveRoot, 'package.json')
export const sdPackage = resolve(sdRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
// export const docPackage = resolve(docRoot, 'package.json')
