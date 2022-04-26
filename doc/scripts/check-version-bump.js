#! /usr/bin/env node
const semverParse = require('semver').parse;
const chalk = require('chalk');
const { isMasterBranch, getCurrentBranchName } = require('./utils');

// npm 5、6: undefined new
// npm 7: new old
// console.log(process.env.npm_new_version, process.env.npm_package_version);
const newVersion = process.env.npm_new_version || process.env.npm_package_version;
const prerelease = semverParse(newVersion)?.prerelease;
// const perid = process.env.npm_config_perid;
console.log(newVersion, prerelease);

if (isMasterBranch(getCurrentBranchName())) {
  if (prerelease && prerelease.length > 0) {
    console.log(chalk.red('你不能在此分支发布测试版'));
    process.exit(1);
  }
} else if (!prerelease || prerelease.length === 0) {
  console.log(chalk.red('你不能在此分支发布正式版'));
  process.exit(1);
}
