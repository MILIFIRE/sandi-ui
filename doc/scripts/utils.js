const { execSync } = require('child_process');

const isMasterBranch = (branchName) => ['master','online', 'main',  'latest'].includes(branchName);

// execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
exports.getCurrentBranchName = () => execSync('git branch --show-current').toString().trim();
exports.isMasterBranch = isMasterBranch;
