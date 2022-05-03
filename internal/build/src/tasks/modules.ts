import type { RollupBuild } from 'rollup'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { sdRoot, pkgRoot, sdPackage } from '../project-path'
import type { ProjectManifest } from '@pnpm/types'
import { buildConfigEntries, target } from '../build-info'

import type { OutputOptions } from 'rollup'

// 获取包依赖清单
export const getPackageManifest = (pkgPath: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(pkgPath) as ProjectManifest
}

// 获取包依赖
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

// 生成拓展
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

// 写入包
export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
    return Promise.all(options.map((option) => bundle.write(option)))
}

// 排除文件
export const excludeFiles = (files: string[], prev: string) => {
    const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
    return files.filter(
        (path) => !excludes.some((exclude) => path.includes(exclude, prev.length))
    )
}

// 构建模块
export const buildModules = async () => {
    // 获取 所有需要打包的文件
    const input = excludeFiles(
        await glob('**/*.{js,ts,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true,
        }), pkgRoot
    )

    // 执行打包
    const bundle = await rollup({
        input,
        plugins: [
            vue({
                isProduction: false,
            }), // vue 文件解析
            vueJsx(), // vue 文件解析
            nodeResolve({
                extensions: ['.mjs', '.js', '.json', '.ts'],
            }), // node 文件解析啊
            commonjs(), // commonjs 文件解析
            esbuild({
                // sourceMap: true,
                target,
                loaders: {
                    '.vue': 'ts',
                },
            }), // esbuild 打包
        ],
        external: await generateExternal({ full: false }), // 不打包外部引用
        treeshake: false, // 不进行摇树
    })
    //
    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            return {
                format: config.format,
                dir: config.output.path,
                exports: module === 'cjs' ? 'named' : undefined,
                preserveModules: true,
                preserveModulesRoot: sdRoot,
                // sourcemap: true,
                entryFileNames: `[name].${config.ext}`,
            }
        })
    )
}
