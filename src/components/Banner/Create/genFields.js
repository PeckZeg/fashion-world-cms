import reduce from 'lodash/reduce';
import assign from 'lodash/assign';

import formItemLayout from '@const/form/itemLayout';
import * as baseFields from '../baseFields';

const PROPS = [
  'channelId',
  'categoryId',
  'type',
  'title',
  'description',
  'priority',
  'valueUrl',
  'valueVideoId'
];

export default com => reduce(PROPS, (fields, field) => assign(fields, {
  [field]: {
    form: com.props.form,
    field: baseFields[field].field || field,
    ...baseFields[field],
    ...formItemLayout
  }
}), {});
