import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import map from 'lodash/map';

import * as category from './category';
import * as account from './account';
import * as channel from './channel';
import { title } from '../config';

// 菜单列表
export const menus = [
  channel,
  category,
  account
];

// 基础键列表
export const keys = map(menus, 'key');

// 菜单路由列表
export const routes = reduce(menus, (routes, { items }) => {
  forEach(items, ({ key, component, permission }) => {
    if (key && component) {
      routes.push({ key, component, permission });
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

// 路由 - 组件映射
// export const routeComponents = reduce(menus, (routes, { items }) => {
//   forEach(items, ({ key, component }) => {
//     routes[key] = component;
//   });
//
//   return routes;
// }, {});

// 菜单键 -> 基本查询映射表
export const baseQueriesByRoute = reduce(menus, (queries, { items }) => {
  forEach(items, ({ key, baseQuery }) => {
    queries[key] = baseQuery;
  });

  return queries;
}, {});

// 文档标题（按路由）
export const docTitlesByRoute = reduce(menus, (routes, { label: mainLabel, items }) => {
  forEach(items, ({ key, label }) => {
    routes[key] = `${label} - ${mainLabel} - ${title}`;
  });

  return routes;
}, {});

// 面包屑次级类别路由表
export const breadcrumbIndexRoutes = reduce(menus, (routes, { label, indexRoute, items }) => {
  forEach(items, ({ key }) => {
    routes[key] = {
      route: indexRoute,
      label
    };
  });

  return routes;
}, {});

// 面包屑三级类别路由表
export const breadcrumbRoutes = reduce(menus, (routes, { items }) => {
  forEach(items, ({ key, label }) => {
    routes[key] = label;
  });

  return routes;
}, {});
