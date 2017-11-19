import moment from 'moment';

import isUndefined from 'lodash/isUndefined';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import get from 'lodash/get';

import String from '~/src/dataTypes/String';

/**
 *  验证表单值
 *  @param from antd form 对象实例
 *  @param {object} [fields = {}] 验证字段模型
 *  @returns {object} 值字典
 */
export default (form, fields = {}) => new Promise((resolve, reject) => {
  form.validateFieldsAndScroll((err, values) => {
    // if (err) return reject(err);

    if (err) {
      const key = keys(err)[0];
      const message = get(err, `${key}.errors[0].message`) || '未知错误';
      return reject(new Error(message));
    }

    values = reduce(values, (values, value, key) => {
      if (isUndefined(value)) {
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
