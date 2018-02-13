import get from 'lodash/get';

export default function(object, path, defaultValue = '-') {
  return get(object, path, defaultValue) || defaultValue;
};
