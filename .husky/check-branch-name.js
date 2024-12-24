import { execSync } from 'node:child_process';

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString()
  .trim();

const branchNameRegex = /^(feature|bugfix|hotfix|release)\/.+/;
const ignoreNameBranch = ['develop', 'staging', 'release', 'master'];

if (!ignoreNameBranch.includes(branchName) && !branchNameRegex.test(branchName)) {
  console.error(`
  [ERROR]: Имя ветки "${branchName}" не соответствует требуемому формату.
  [ERROR]: Используйте:
    - feature/код-задачи,
    - bugfix/код-задачи,
    - hotfix/код-задачи,
    - release/код-задачи.
  `);
  process.exit(1);
}
