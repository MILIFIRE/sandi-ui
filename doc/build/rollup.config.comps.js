import { defineConfig } from 'rollup';
import genBaseConfig, { INPUT_PATH } from './rollup.config.base';

const banner = `/*!
* ${process.env.npm_package_name} v${process.env.npm_package_version}
*/`;

const componentsConfig = defineConfig([
  {
    ...genBaseConfig(),
    input: `${INPUT_PATH}/index.ts`,
    output: [
      {
        // file: 'es/index.js',
        dir: 'es',
        format: 'es',
        banner,
        preserveModules: true,
        preserveModulesRoot: 'packages',
      },
    ],
  },
  {
    ...genBaseConfig(),
    input: `${INPUT_PATH}/index.ts`,
    output: [
      {
        // file: 'es/index.js',
        dir: 'cjs',
        banner,
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'packages',
      },
    ],
  },
]);

export default componentsConfig;
