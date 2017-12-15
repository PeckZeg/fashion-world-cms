import forEach from 'lodash/forEach';
import has from 'lodash/has';

import hasPermission from './hasPermission';
import setStateAsync from './setStateAsync';
import ref from './ref';

const METHOD_LIST = {
  hasPermission,
  setStateAsync,
  ref
};

/**
 *  注入原型
 *  @param {...string} names 注入的方法
 */
export default (...names) => ({ prototype }) => {
  forEach(names, name => {
    if (!has(prototype, name) && has(METHOD_LIST, name)) {
      prototype[name] = METHOD_LIST[name];
    }
  });
};
