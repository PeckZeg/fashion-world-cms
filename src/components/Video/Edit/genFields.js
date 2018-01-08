import reduceBaseProps from '@util/form/field/reduceBaseProps';
import submitFormLayout from '@const/form/submitLayout';
import formItemLayout from '@const/form/itemLayout';
import * as baseFields from '../baseFields';

const BASE_PROPS = [
  'channelId',
  'categoryId',
  'title',
  'subtitle',
  'abstract',
  'summary',
  'originalTitle',
  'originalLanguage',
  'rightsOwner',
  'productionCountry',
  'priority',
  'views'
];

export default com => ({
  ...reduceBaseProps(com, BASE_PROPS, baseFields),

  cover: {
    ...baseFields.cover,
    ...formItemLayout
  },

  submit: submitFormLayout
});
