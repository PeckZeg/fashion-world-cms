import { parse } from 'querystring';

import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import forEach from 'lodash/forEach';

import NumberShape from '~/src/dataTypes/Number';

/**
 *  解析查询字符串
 *  @param {string} search 查询字符串
 *  @param {object} [props] 转换表，表值接受 `{ type, default }`
 *  @returns {object} 转换后的对象
 */
export default function(search, props) {
  let query  = parse(/^\?/.test(search) ? search.slice(1) : search);

  forEach(props, (opts, prop) => {
    const { type, default: defaults } = isPlainObject(opts) ? opts: { type: opts };
    let value = query[prop] || defaults;

    switch (type) {
      case NumberShape:
        if (!isUndefined(value)) {
          value = parseFloat(value);

          if (!isNaN(value)) {
            query[prop] = value;
          }
        }
        break;

      case NumberShape.Integer:
        if (!isUndefined(value)) {
          value = parseInt(value);

          if (!isNaN(value)) {
            query[prop] = value;
          }
        }
        break;

      default:
        // ...
    }
  });

  return query;
};
