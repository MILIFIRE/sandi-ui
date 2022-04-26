// import esbuild from 'rollup-plugin-esbuild';
import { resolve } from 'path';
import vue from 'rollup-plugin-vue'; // 处理vue文件
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
// import styles from 'rollup-plugin-styles';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from '../package.json';
import { replacement } from './common.config';

export const INPUT_PATH = resolve(__dirname, '../packages');

const deps = Object.keys(pkg.peerDependencies || {})
  .concat(Object.keys(pkg.dependencies))
  .concat(Object.keys(pkg.devDependencies))
  .concat([/node_modules/]);

const genBaseConfig = ({ ts } = {}) => {
  /**
   * @type {import('rollup').RollupOptions}
   */
  const config = {
    external: deps,
    plugins: [
      replace({ values: replacement, preventAssignment: true }),
      vue({
        exposeFilename: true,
        // preprocessStyles: true,
      }),
      // styles({
      //   mode: 'emit',
      //   // mode: ['extract', 'index.css'],
      //   autoModules: true,
      //   sourceMap: false,
      // }),
      // emitCSS(),
      // https://github.com/egoist/rollup-plugin-postcss/issues/336
      postcss({
        extract: true,
      }),
      typescript({ ...ts, tsconfig: resolve(__dirname, '../tsconfig.build.json') }),
      babel({
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.vue'],
      }),
      nodeResolve(),
    ],
  };
  return config;
};

export default genBaseConfig;
