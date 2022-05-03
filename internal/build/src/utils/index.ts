import type { ProjectManifest } from '@pnpm/types'
import type { OutputOptions, RollupBuild } from 'rollup'
import { sdPackage } from '../project-path'
export * from './process'
export * from './gulp'
export * from './pkg'

export const getPackageManifest = (pkgPath: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (
    pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
    const manifest = getPackageManifest(pkgPath)
    const { dependencies = {}, peerDependencies = {} } = manifest

    return {
        dependencies: Object.keys(dependencies),
        peerDependencies: Object.keys(peerDependencies),
    }
}
export const generateExternal = async (options: { full: boolean }) => {
    const { dependencies, peerDependencies } = getPackageDependencies(sdPackage)

    return (id: string) => {
        const packages: string[] = peerDependencies
        if (!options.full) {
            packages.push('@vue', ...dependencies)
        }

        return [...new Set(packages)].some(
            (pkg) => id === pkg || id.startsWith(`${pkg}/`)
        )
    }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
    return Promise.all(options.map((option) => bundle.write(option)))
}

export const excludeFiles = (files: string[], prev: string = '') => {
    const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
    return files.filter(
        (path) => !excludes.some((exclude) => path.includes(exclude, prev.length))
    )
}
