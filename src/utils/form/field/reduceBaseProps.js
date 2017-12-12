import reduce from 'lodash/reduce';
import assign from 'lodash/assign';

import formItemLayout from '~/src/const/form/itemLayout';

export default function(com, baseProps, baseFields) {
  const { form, entry } = com.props;

  return reduce(baseProps, (values, field) => assign(values, {
    [field]: {
      ...baseFields[field],
      ...formItemLayout,
      field,
      form,
      initialValue: entry[field]
    }
  }), {});
};
