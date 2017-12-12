import reduceBaseProps from '~/src/utils/form/field/reduceBaseProps';
import * as baseFields from '~/src/components/Channel/baseFields';
import submitFormLayout from '~/src/const/form/submitLayout';
import formItemLayout from '~/src/const/form/itemLayout';

const BASE_PROPS = ['name', 'priority'];

export default function(com) {
  // const { form, entry } = com.props;

  return {
    ...reduceBaseProps(com, BASE_PROPS, baseFields),

    cover: {
      ...baseFields.cover,
      ...formItemLayout
    },

    submit: submitFormLayout
  };
};
