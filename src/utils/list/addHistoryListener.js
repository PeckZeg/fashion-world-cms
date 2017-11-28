import isFunction from 'lodash/isFunction';

import getBaseQuery from '~/src/utils/getBaseQuery';
import parseQuery from '~/src/utils/query/parse';

/**
 *  添加历史记录监听器
 *  @param {React.Component} com 组件实例
 *  @param {object} [querySchema] 查询模型
 */
export default function(com, querySchema) {
  const historyListener = com.props.history.listen(location => {
    const { pathname, search } = location;
    const baseQuery = getBaseQuery(pathname);
    const { offset, limit } = parseQuery(search, querySchema);

    com.setState({ baseQuery }, () => {
      isFunction(com.fetchEntryList) && com.fetchEntryList(offset, limit);
    });
  });

  com.setState({ historyListener }, () => {
    isFunction(com.fetchEntryList) && com.fetchEntryList();
  });
};
