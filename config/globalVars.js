const snakeCase = require('lodash/snakeCase');
const toUpper = require('lodash/toUpper');
const forEach = require('lodash/forEach');

const paths = require('./paths');
const packageJSON = require(paths.appPackageJson);

const vars = {
  version: packageJSON.version,
  updateTime: +new Date()
};

forEach(vars, (value, key) => {
  exports[`__${toUpper(snakeCase(key))}__`] = JSON.stringify(value);
});
