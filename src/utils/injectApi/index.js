import forEach from 'lodash/forEach';
import has from 'lodash/has';

import * as my from './my';

const METHOD_LIST = {
  my
};

/**
 *  注入接口装饰器
 *  @param {...string} 接口类型
 *  @returns {Function} 类装饰器
 */
export default function(...types) {
  return function(Component) {
    if (!has(Component.prototype, 'token')) {
      Component.prototype.token = function() {
        return this.props.token;
      };
    }

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
