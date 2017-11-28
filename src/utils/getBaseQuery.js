import { baseQueriesByRoute } from '~/src/const/siders';

/**
 *  获取基本查询条件
 *  @param {string} path 匹配路径
 *  @returns {object} 基本查询条件
 */
export default function(path) {
  return baseQueriesByRoute[path];
};
