const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  '~': resolveApp(''),
  '@components': resolveApp('src/components'),
  '@api': resolveApp('src/api'),
  '@util': resolveApp('src/utils'),
  '@const': resolveApp('src/const'),
  '@qiniu': resolveApp('src/components/Qiniu'),
  '@table': resolveApp('src/components/Table'),
  '@table-column': resolveApp('src/components/Table/Column'),
  '@form-item': resolveApp('src/components/Form/Item'),
  '@layout': resolveApp('src/components/layouts'),
  '@docs': resolveApp('src/components/Docs'),
  '@api-docs': resolveApp('src/components/Docs/Api')
};
