import reduceBaseProps from '@util/form/field/reduceBaseProps';
import submitFormLayout from '@const/form/submitLayout';
import formItemLayout from '@const/form/itemLayout';
import * as baseFields from '../baseFields';

const BASE_PROPS = ['name', 'gender'];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields),

  avatar: {
    ...baseFields.avatar,
    ...formItemLayout
  },

  submit: submitFormLayout
});
