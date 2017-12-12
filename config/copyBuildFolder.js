const rimraf = require('rimraf');
const chalk = require('chalk');
const util = require('util');
const path = require('path');
const ncp = require('ncp');
const fs = require('fs');

const paths = require('./paths');
let config = {};

try {
  config = require(paths.fwConfig);
}

catch (err) {
  // ...
}

const rimrafAsync = util.promisify(rimraf);
const ncpAsync = util.promisify(ncp.ncp);

module.exports = async () => {
  const { copyTo } = config;

  if (copyTo && fs.existsSync(copyTo)) {
    console.log();
    const src = path.join(process.cwd(), 'build');
    const dest = path.join(copyTo, 'build');

    await rimrafAsync(path.join(copyTo, 'build'));
    await ncpAsync(src, dest);
    console.log('build folder is already copy to:');
    console.log('', chalk.gray(dest));
  }
};
