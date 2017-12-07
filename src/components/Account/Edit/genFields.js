import reduce from 'lodash/reduce';
import assign from 'lodash/assign';

import * as baseFields from '~/src/components/Account/baseFields';
import submitFormLayout from '~/src/const/form/submitLayout';
import formItemLayout from '~/src/const/form/itemLayout';

const BASE_PROPS = ['name', 'permissions'];

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

      submit: submitFormLayout
    }), {})
  };
};
