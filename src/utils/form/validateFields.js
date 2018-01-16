import moment from 'moment';

import isUndefined from 'lodash/isUndefined';
import startsWith from 'lodash/startsWith';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import compact from 'lodash/compact';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import isNil from 'lodash/isNil';
import unset from 'lodash/unset';
import keys from 'lodash/keys';
import uniq from 'lodash/uniq';
import get from 'lodash/get';

import String from '~/src/dataTypes/String';

/**
 *  验证表单值
 *  @param from antd form 对象实例
 *  @param {object} [fields = {}] 验证字段模型
 *  @param {object} [opts = {}] 配置项
 *  @param {boolean} [opts.nil = false] 将空值转换成 `null`
 *  @returns {object} 值字典
 */
export default (form, fields, opts = {}) => new Promise((resolve, reject) => {
  const { nil = false } = opts;

  fields = fields || {};

  form.validateFieldsAndScroll((err, values) => {
    if (err) {
      const key = keys(err)[0];
      const message = get(err, `${key}.errors[0].message`) || '未知错误';
      return reject(new Error(message));
    }

    if (!isUndefined(opts.group)) {
      const group = isArray(opts.group) ? opts.group : [opts.group];

      forEach(group, group => {
        let value = [];

        forEach(filter(keys(values), key => startsWith(key, group)), key => {
          const val = values[key];

          if (isArray(val)) {
            value = [...value, ...val];
          }

          else {
            value = [...value, val];
          }

          unset(values, key);
        });

        values[group] = uniq(compact(value));
      });
    }

    values = reduce(values, (values, value, key) => {
      if (nil) {
        if (isNil(value)) {
          value = null;
        }
      }

      else if (isUndefined(value)) {
        return values;
      }

      if (moment.isMoment(value)) {
        value = +value;
      }

      if (!isUndefined(fields[key])) {
        switch (fields[key]) {
          case String.MD5:
            value = (new String.MD5(value)).toString();
            break;

          default:
            // ...
        }
      }

      values[key] = value;

      return values;
    }, {});

    resolve(values);
  });
});
