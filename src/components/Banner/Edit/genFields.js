import reduceBaseProps from '@util/form/field/reduceBaseProps';
import submitFormLayout from '@const/form/submitLayout';
import formItemLayout from '@const/form/itemLayout';
import * as baseFields from '../baseFields';

import reduce from 'lodash/reduce';
import assign from 'lodash/assign';
import get from 'lodash/get';

const BASE_PROPS = [
  'channelId',
  'categoryId',
  'type',
  'title',
  'description',
  'priority'
];

const VALUE_PROPS = [
  'valueUrl',
  'valueVideoId'
];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields),

  ...reduce(VALUE_PROPS, (props, prop) => assign(props, {
    [prop]: {
      form: com.props.form,
      ...baseFields[prop],
      ...formItemLayout,
      initialValue: get(com.props.entry, baseFields[prop].field || prop)
    }
  }), {}),

  cover: {
    ...baseFields.cover,
    ...formItemLayout
  },

  // valueType: {
  //   form: com.props.form,
  //   ...baseFields.valueType,
  //   ...formItemLayout,
  //   initialValue: get(com.props.entry, baseFields.valueType.field)
  // },

  submit: submitFormLayout
});
