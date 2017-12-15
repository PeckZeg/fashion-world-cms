import reduce from 'lodash/reduce';
import assign from 'lodash/assign';

import * as baseFields from '~/src/components/Account/baseFields';
import submitFormLayout from '~/src/const/form/submitLayout';
import formItemLayout from '~/src/const/form/itemLayout';

const BASE_PROPS = ['name', 'permissions'];

/**
 *  生成字段字典
 *  @param {React.Component} 当前组件实例
 *  @returns {object[]} 字段字典
 */
export default function(com) {
  const { form, entry } = com.props;

  return {
    ...reduce(BASE_PROPS, (values, field) => assign(values, {
      [field]: {
        ...baseFields[field],
        ...formItemLayout,
        field,
        form,
        initialValue: entry[field]
      },

      password: {
        ...baseFields.password,
        ...formItemLayout,
        field: 'password',
        form
      },

      avatar: {
        ...baseFields.avatar,
        ...formItemLayout
      },

      submit: submitFormLayout
    }), {})
  };
};
