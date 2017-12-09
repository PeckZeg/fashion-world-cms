import forEach from 'lodash/forEach';
import has from 'lodash/has';

import * as account from './account';
import * as qiniu from './qiniu';
import * as my from './my';

const METHOD_LIST = {
  account,
  qiniu,
  my
};

const GLOBAL_METHOD = {
  token() {
    return this.props.token;
  },

  setStateAsync(...args) {
    return new Promise(resolve => {
      this.setState(...args, () => resolve(this.state));
    });
  }
};

/**
 *  注入接口装饰器
 *  @param {...string} 接口类型
 *  @returns {Function} 类装饰器
 */
export default function(...types) {
  return function(Component) {
    forEach(GLOBAL_METHOD, (method, name) => {
      if (!has(Component.prototype, name)) {
        Component.prototype[name] = method;
      }
    });

    forEach(types, type => {
      if (has(METHOD_LIST, type)) {
        forEach(METHOD_LIST[type], (method, name) => {
          if (!has(Component.prototype, name)) {
            Component.prototype[name] = method;
          }
        });
      }
    });

    return Component;
  };
};
