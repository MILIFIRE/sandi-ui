// 进程
import process from 'process'
// 路径 控制
import path from 'path'
// 文件 promise 版本
import fs from 'fs/promises'
// 优雅的控制台输出
import consola from 'consola'
// sfc 解析
import * as vueCompiler from 'vue/compiler-sfc'
// ts 编译器 API版本
import { Project } from 'ts-morph'
// 快速的文件收集器
import glob from 'fast-glob'
// 终端 字符样式库
import chalk from 'chalk'
// 帮助文件
import {
    buildOutput,
    sdRoot,
    pkgRoot,
    projRoot,
} from '../propject-path'
import {
    excludeFiles,
} from '../utils'
// 样式路径重写
import { pathRewriter } from '../utils'
// 类型安全
import typeSafe from '../type-safe.json'
// 源文件
import type { SourceFile } from 'ts-morph'
// ts config 读取
const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.json')
console.log("TSCONFIG_PATH:-------------------------", TSCONFIG_PATH)
// 刷出文件地址
const outDir = path.resolve(buildOutput, 'types')

// Type safe list. The TS errors are not all fixed yet, so we need a list of which files are fixed with TS errors to prevent accidental TS errors.
const typeSafePaths = typeSafe.map((_path) => {
    let safePath = path.resolve(projRoot, _path)
    if (_path.endsWith('/')) safePath += path.sep
    return safePath
})

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
// 生成定义类型
export const generateTypesDefinitions = async () => {
    // 新项目
    const project = new Project({
        compilerOptions: {
            emitDeclarationOnly: true,
            declaration: true,
            outDir, // 输出文件地址
            baseUrl: projRoot, // 编译文件地址
            strict: true,
            paths: {
                '@sudi-ui/*': ['packages/*'],
            }, // 路径映射
            // preserveSymlinks: true, // 保留符号链接  使用的workspace
            types: [
                // path.resolve(projRoot, 'typings/env.d.ts'),
                // 'unplugin-vue-define-options',
            ], //声明包文件
        },
        tsConfigFilePath: TSCONFIG_PATH, // tsconfig配置文件
        skipAddingFilesFromTsConfig: true, //跳过从tsconfig 添加文件
    })

    const globAnyFile = '**/*.{js?(x),ts?(x),vue}' // 正则匹配所有的 js vue ts
    // 文件路径
    const filePaths = excludeFiles(
        await glob([globAnyFile, '!sudi-ui/**/*'], {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true,

        })
    ).filter((path) => !(path.includes("modules/loaders") || path.includes("modules/controls/")))
    consola.log('filePaths----------:', filePaths)
    // sudi-ui 根目录
    // const sdPaths = excludeFiles(
    //     await glob(globAnyFile, {
    //         cwd: sdRoot,
    //         onlyFiles: true,
    //     })
    // )
    // 源文件列表
    const sourceFiles: SourceFile[] = []
    await Promise.all([
        ...filePaths.map(async (file) => {
            // 文件 以vue 结尾
            if (file.endsWith('.vue')) {
                // 读取文件内容
                const content = await fs.readFile(file, 'utf-8')
                // sfc 解析
                const sfc = vueCompiler.parse(content)
                // 分割 脚本 和 setup 部分
                const { script, scriptSetup } = sfc.descriptor
                // 如果任意存在
                if (script || scriptSetup) {
                    // 获取脚本内容
                    let content = script?.content ?? ''
                    // 获取 setup
                    if (scriptSetup) {
                        const compiled = vueCompiler.compileScript(sfc.descriptor, {
                            id: 'xxx',
                        })
                        // 编译后产物组合
                        content += compiled.content
                    }
                    // 获取脚本语言类型
                    const lang = scriptSetup?.lang || script?.lang || 'js'
                    // 创建源文件
                    const sourceFile = project.createSourceFile(
                        `${path.relative(process.cwd(), file)}.${lang}`,
                        content
                    )
                    // 放入原文件数组
                    sourceFiles.push(sourceFile)
                }
            } else {
                // ts js 文件 路径直接放入 f
                const sourceFile = project.addSourceFileAtPath(file)
                sourceFiles.push(sourceFile)
            }
        }),
        // element plus 文件夹
        // ...sdPaths.map(async (file) => {
        //     const content = await fs.readFile(path.resolve(sdRoot, file), 'utf-8')
        //     sourceFiles.push(
        //         project.createSourceFile(path.resolve(pkgRoot, file), content)
        //     )
        // }),
    ])
    // 编译诊断
    const diagnostics = project.getPreEmitDiagnostics()
    //   // 编译诊断 有 抛出错误
    // if (diagnostics.length > 0) {
    //     consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    //     const err = new Error('Failed to generate dts.')
    //     consola.error(err)
    //     throw err
    // }
    // 开始转换 只输出声明文件
    await project.emit({
        emitOnlyDtsFiles: true,
    })
    // 遍历所有的源文件
    const tasks = sourceFiles.map(async (sourceFile) => {
        // 获取文件路径 相对文件位置
        const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
        // 输出追踪
        consola.trace(
            chalk.yellow(
                `Generating definition for file: ${chalk.bold(relativePath)}`
            )
        )
        // 转换输出
        const emitOutput = sourceFile.getEmitOutput()
        // 转换输出 文件
        const emitFiles = emitOutput.getOutputFiles()
        // 没有文件 输出 抛出异常
        if (emitFiles.length === 0) {
            // throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
            console.log('空--------：', relativePath)
        } else {
            // 输出的文件
            const tasks = emitFiles.map(async (outputFile) => {
                const filepath = outputFile.getFilePath()
                // 创建文件夹
                await fs.mkdir(path.dirname(filepath), {
                    recursive: true,
                })
                // 写入文件位置
                await fs.writeFile(
                    filepath,
                    pathRewriter('esm')(outputFile.getText()),
                    'utf8'
                )
                // 类型输出完成
                consola.success(
                    chalk.green(
                        `Definition for file: ${chalk.bold(relativePath)} generated`
                    )
                )
            })

            await Promise.all(tasks)
        }

    })

    await Promise.all(tasks)
}
