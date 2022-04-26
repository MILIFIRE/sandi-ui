import type { UserConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import rollupReplace from '@rollup/plugin-replace';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import { VitePlugin as TsChecker } from 'vite-esbuild-typescript-checker';
// import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
// import eslintPlugin from 'vite-plugin-eslint';
import demoIframe from './.vitepress/markdown/plugin/vite-plugin-dev-demo-iframe';
import { replacement } from '../build/common.config';

import { compilerOptions } from '../tsconfig.json';

const projectRootDir = resolve(__dirname, '..');

const alias = {
  path: require.resolve('path-browserify'),
};

Object.entries(compilerOptions.paths).forEach(([key, [value]]) => {
  alias[key.replace(/\/\*$/, '')] = resolve(projectRootDir, compilerOptions.baseUrl || '.', value.replace(/\/\*$/, ''));
});
// delete alias['@'];
const config: UserConfig = {
  resolve: {
    alias,
  },
  server: {
    port: 7237,
    fs: {
      strict: false,
      // 可以为项目根目录的上一级提供服务
      allow: ['..'],
    },
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  plugins: [
    PkgConfig(),
    OptimizationPersist(),
    vueJsx(),
    rollupReplace({ values: replacement, preventAssignment: true }),
    demoIframe(),
    TsChecker({
      vite: {
        overlay: true,
      },
      checker: {
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: '@vue/compiler-sfc',
            },
          },
        },
      },
    }),
    // process.env.NODE_ENV === 'development' &&
    //   eslintPlugin({
    //     include: 'packages/**/*.{vue,js,jsx,ts,tsx}',
    //   }),
  ],
};
export default config;
