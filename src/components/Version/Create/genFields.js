import reduce from 'lodash/reduce';
import assign from 'lodash/assign';

import formItemLayout from '@const/form/itemLayout';
import * as baseFields from '../baseFields';

const PROPS = [
  'type',
  'version',
  'link',
  'title',
  'description'
];

export default function(com) {
  const { form } = com.props;

  return reduce(PROPS, (fields, field) => assign(fields, {
    [field]: {
      form,
      field,
      ...baseFields[field],
      ...formItemLayout
    }
  }), {});
};
