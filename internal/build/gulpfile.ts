
import { mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { addTaskName, run, runTask } from './src/utils'
import { sdOutput } from './src/propject-path'
export default series(
    addTaskName("clean", () => run('pnpm run clean:dist')),
    addTaskName("mkdir", () => mkdir(sdOutput, { recursive: true })),
    parallel(
        runTask('buildModules'),
        runTask('generateTypesDefinitions')
    )
)
export * from "./src"