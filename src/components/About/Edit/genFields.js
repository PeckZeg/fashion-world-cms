import reduceBaseProps from '@util/form/field/reduceBaseProps';
import submitFormLayout from '@const/form/submitLayout';
import * as baseFields from '../baseFields';

const BASE_PROPS = ['name', 'value', 'priority'];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields),

  submit: submitFormLayout
});
