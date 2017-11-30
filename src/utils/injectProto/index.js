import forEach from 'lodash/forEach';
import has from 'lodash/has';

import setStateAsync from './setStateAsync';
import ref from './ref';

const METHOD_LIST = {
  setStateAsync,
  ref
};

export default function(...methods) {
  return function(Com) {
    forEach(methods, name => {
      if (!has(Com.prototype, name) && has(METHOD_LIST, name)) {
        Com.prototype[name] = METHOD_LIST[name];
      }
    });

    return Com;
  };
}
