// console.log('babel config');
const { resolve } = require('path');
const { compilerOptions } = require('./tsconfig.json');

const projectRootDir = __dirname;

const alias = {};

Object.entries(compilerOptions.paths).forEach(([key, [value]]) => {
  alias[key.replace(/\/\*$/, '')] = resolve(projectRootDir, compilerOptions.baseUrl || '.', value.replace(/\/\*$/, ''));
});

module.exports = {
  // exclude: '**/node_modules/**',
  presets: [
    [
      '@babel/env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        loose: true,
        modules: process.env.NODE_ENV === 'test' && 'auto',
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        version: '^7.15.3',
      },
    ],
    [
      '@vue/babel-plugin-jsx',
      {
        enableObjectSlots: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias,
      },
    ],
  ],
};
