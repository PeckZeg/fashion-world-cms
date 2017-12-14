import reduceBaseProps from '~/src/utils/form/field/reduceBaseProps';
import * as baseFields from '~/src/components/Category/baseFields';
import submitFormLayout from '~/src/const/form/submitLayout';
import formItemLayout from '~/src/const/form/itemLayout';

const BASE_PROPS = ['name', 'priority'];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields),

  cover: {
    ...baseFields.cover,
    ...formItemLayout
  },

  submit: submitFormLayout
});
