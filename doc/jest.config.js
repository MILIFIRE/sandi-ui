const babelConfig = require('./babel.config.js');

module.exports = {
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[jt]sx?$': ['babel-jest', babelConfig],
    '^.+\\.scss$': 'jest-scss-transform',
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'vue', 'jsx'],

  coverageThreshold: {
    // 所有文件总的覆盖率要求
    // global: {
    //   branches: 60,
    //   lines: 85,
    //   functions: 70,
    //   statements: 80,
    // },
    // 匹配到的单个文件的覆盖率要求
    // 这里也支持通配符的配置
    // './src/**/*.{ts,tsx}': {
    //   branches: 40,
    //   functions: 40,
    //   lines: 40,
    //   statements: 40,
    // },
  },
  coveragePathIgnorePatterns: [
    'utils',
  ],
  // collectCoverageFrom: ['packages/{!(login.),}/**'],
  // u can change this option to a more specific folder for test single component or util when dev
  // for example, ['<rootDir>/packages/input']
  // roots: ['<rootDir>'],
};
