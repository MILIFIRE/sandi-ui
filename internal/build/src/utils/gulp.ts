import { buildRoot } from '../project-path'
import { run } from './process'

import type { TaskFunction } from 'gulp'

export const addTaskName = <T extends TaskFunction>(name: string, fn: T) =>
    Object.assign(fn, { displayName: name })

export const runTask = (name: string) =>
    addTaskName(`shellTask:${name}`, () =>
        run(`pnpm run build ${name}`, buildRoot)
    )
