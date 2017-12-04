import { notification } from 'antd';

import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import has from 'lodash/has';

/**
 *  捕获错误
 *  @param {React.Component} component 组件实例
 *  @param {Error} 错误实例
 *  @param {object} [opts = {}] 可配置项
 *  @param {string} [opts.message = '你碰到了一个错误'] 通知标题栏
 *  @param {string} [opts.description = '未知错误'] 通知错误内容默认值
 *  @param {boolean|string} [opts.loading] 在通知弹出的时候关闭 `loading` 状态，
 *                                         指定为字符串时将使用该字符串关闭状态
 */
export default (component, err, opts = {}) => {
  let { message = '你碰到了一个错误' } = opts;
  let description = err.message || opts.description || '未知错误';
  let response;

  console.error(err);

  // handle axios error
  if (has(err, 'response')) {
    const { status, statusText, data } = err.response;
    response = err.response;
    description = `${status}: ${data.message || statusText}`;

    if (status === 404 && data.message === 'apiKey not found') {
      const { location, history } = component.props;

      if (location && history) {
        history.push(`/my/login?redirect=${location.pathname}`);
      }
    }
  }

  if (has(opts, 'loading')) {
    if (isBoolean(opts.loading)) {
      component.setState({ loading: false });
    }

    else if (isString(opts.loading)) {
      component.setState({ [opts.loading]: false });
    }
  }

  notification.error({ message, description });

  return {
    message,
    description,
    ...response && { response } 
  };
};
