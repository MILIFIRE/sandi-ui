import pkg from '../package.json';

export const replacement = {
  'process.env.npm_package_version': JSON.stringify(process.env.npm_package_version || pkg.version),
  // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
};

// export const alias
