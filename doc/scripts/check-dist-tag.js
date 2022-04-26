#! /usr/bin/env node
const chalk = require('chalk');
const { isMasterBranch, getCurrentBranchName } = require('./utils');

const distTag = process.env.npm_config_tag || 'latest';

if (isMasterBranch(getCurrentBranchName())) {
  if (distTag !== 'latest') {
    console.log(chalk.red('你只能在此分支发布正式版，而不是', distTag));
    process.exit(1);
  }
} else if (distTag === 'latest') {
  console.log(chalk.red('你不能在此分支发布正式版，设置 --tag'));
  process.exit(1);
}
