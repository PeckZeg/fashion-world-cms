import reduce from 'lodash/reduce';
import map from 'lodash/map';

import * as category from './category';
import * as account from './account';
import * as channel from './channel';
import * as banner from './banner';
import * as video from './video';

// 权限列表
export const permissions = [
  account,
  banner,
  channel,
  category,
  video
];

// 权限键列表
export const permissionKeys = reduce(permissions, (keys, { items }) => [
  ...keys,
  ...map(items, 'key')
], []);
