import reduceBaseProps from '@util/form/field/reduceBaseProps';
import submitFormLayout from '@const/form/submitLayout';
import formItemLayout from '@const/form/itemLayout';
import * as baseFields from '../baseFields';

const BASE_PROPS = [
  'title',
  'description',
  'link'
];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields),

  type: {
    label: '更新平台',
    ...formItemLayout
  },

  version: {
    label: '版本',
    ...formItemLayout
  },

  cover: {
    ...baseFields.cover,
    ...formItemLayout
  },

  submit: submitFormLayout
});
