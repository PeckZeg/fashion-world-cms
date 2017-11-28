import isUndefined from 'lodash/isUndefined';

import parseQuery from '~/src/utils/query/parse';

/**
 *  生成查询参数
 *  @param {React.Component} com 组件实例
 *  @param {number} offset 页面位移
 *  @param {number} limit 每页限制
 *  @param {object} querySchema 查询模型
 *  @returns {object} 查询参数
 */
export default function(com, offset, limit, querySchema) {
  const { location } = com.props;
  const { baseQuery } = com.state;

  offset = !isUndefined(offset) ? offset : com.state.offset;
  limit = !isUndefined(limit) ? limit : com.state.limit;

  return {
    ...parseQuery(location.search, querySchema),
    ...baseQuery,
    offset,
    limit
  };
};
