import forEach from 'lodash/forEach';
import has from 'lodash/has';

import setStateAsync from '@util/injectProto/setStateAsync';

import * as loopVideo from './loopVideo';
import * as category from './category';
import * as account from './account';
import * as channel from './channel';
import * as banner from './banner';
import * as qiniu from './qiniu';
import * as about from './about';
import * as video from './video';
import * as user from './user';
import * as my from './my';

const METHOD_LIST = {
  loopVideo,
  category,
  account,
  channel,
  banner,
  video,
  qiniu,
  about,
  user,
  my
};

const GLOBAL_METHOD = {
  token() {
    return this.props.token;
  },

  setStateAsync
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
