import isFunction from 'lodash/isFunction';

/**
 *  移除历史记录监听器
 *  @param {React.Component} com 组件实例
 */
export default function(com) {
  const { historyListener } = com.state;

  if (isFunction(historyListener)) {
    historyListener();
    com.setState({ historyListener: null });
  }
};
