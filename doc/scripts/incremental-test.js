// const { getCurrentBranchName } = require('./utils');
const { execSync } = require('child_process');

const stdout = execSync('git diff HEAD^ HEAD --name-only').toString().trim();
const filenames = stdout.split('\n');

console.log(filenames);
