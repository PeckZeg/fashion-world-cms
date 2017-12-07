import { stringify } from 'querystring';

import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

export default function(query) {
  query = stringify(omitBy(query, value => isNil(value) || value === ''));

  return query ? `?${query}` : '';
};
