import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import map from 'lodash/map';

import * as account from './account';
import * as qiniu from './qiniu';
import * as my from './my';

// 菜单列表
export const menus = [
  my,
  account,
  qiniu
];

// 基础键列表
export const keys = map(menus, 'key');

// 菜单路由列表
export const routes = reduce(menus, (routes, { items }) => {
  forEach(items, ({ key, config }) => {
    if (key && config) {
      routes.push({ key, config });
    }
  });

  return routes;
}, []);

// 菜单路由 - 键映射
export const routeKeys = reduce(menus, (routeKeys, { key, items }) => {
  forEach(items, ({ key: route }) => {
    routeKeys[route] = key;
  });

  return routeKeys;
}, {});

// 菜单键 -> 基本查询映射表
export const baseQueriesByRoute = reduce(menus, (queries, { items }) => {
  forEach(items, ({ key, baseQuery }) => {
    queries[key] = baseQuery;
  });

  return queries;
}, {});
