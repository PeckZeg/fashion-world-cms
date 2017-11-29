const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  '~': resolveApp(''),
  '@table-column': resolveApp('src/components/Table/Column'),
  '@layouts': resolveApp('src/components/layouts'),
  '@docs': resolveApp('src/components/Docs'),
  '@api-docs': resolveApp('src/components/Docs/Api')
};
