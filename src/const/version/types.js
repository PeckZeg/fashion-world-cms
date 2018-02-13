import map from 'lodash/map';

export const types = [
  {
    key: 'ios',
    label: 'iOS',
    icon: 'apple'
  },
  {
    key: 'android',
    label: 'Android',
    icon: 'android'
  }
];

export const typeKeys = map(types, 'key');
