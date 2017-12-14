import isFunction from 'lodash/isFunction';

import getBaseQuery from '~/src/utils/getBaseQuery';
import parseQuery from '~/src/utils/query/parse';

/**
 *  列表 - 添加/移除历史监听器装饰器
 *  @param {object} querySchema 查询模型
 *  @returns {Function} 装饰器 Function(Component)
 */
export default querySchema => ({ prototype }) => {
  const { componentDidMount, componentWillUnmount } = prototype;

  prototype.componentDidMount = function() {
    const historyListener = this.props.history.listen(location => {
      const { pathname, search } = location;
      const baseQuery = getBaseQuery(pathname);
      const { offset, limit } = parseQuery(search, querySchema);

      this.setState({ baseQuery }, () => {
        if (isFunction(this.fetchEntryList)) {
          this.fetchEntryList(offset, limit, 'tableLoading');
        }
      });
    });

    this.setState({ historyListener }, () => {
      if (isFunction(this.fetchEntryList)) {
        this.fetchEntryList();
      }
    });

    if (isFunction(componentDidMount)) {
      componentDidMount.apply(this, arguments);
    }
  };

  prototype.componentWillUnmount = function() {
    const { historyListener } = this.state;

    if (isFunction(historyListener)) {
      historyListener();
      this.setState({ historyListener: null });
    }

    if (isFunction(componentWillUnmount)) {
      componentWillUnmount.apply(this, arguments);
    }
  };
};
