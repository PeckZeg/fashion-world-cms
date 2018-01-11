import reduceBaseProps from '@util/form/field/reduceBaseProps';
import * as baseFields from '../baseFields';

const BASE_PROPS = [
  'subtitleFiles'
];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields)
});
