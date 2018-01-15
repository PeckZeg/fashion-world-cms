import map from 'lodash/map';

import { formItemLayout } from '@const/form/createItemLayout';
import languages from '@const/languages';

export default function(com) {
  const { form } = com.props;

  return {
    lang: {
      ...formItemLayout,
      form,
      field: 'lang',
      label: '语言',
      options: map(languages, value => ({ label: value, value })),
      initialValue: languages[0],
      rules: [
        { required: true, message: '语言是必须滴' }
      ]
    },

    key: {
      ...formItemLayout,
      form,
      field: 'key',
      label: '字幕文件'
    }
  };
};
