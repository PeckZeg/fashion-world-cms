const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  '~': resolveApp(''),
  '@docs': resolveApp('src/components/Docs'),
  '@api-docs': resolveApp('src/components/Docs/Api')
};
