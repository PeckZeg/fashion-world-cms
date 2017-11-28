// import isPlainObject from 'lodash/isPlainObject';
import genSignature from './genSignature';

/**
 *  生成 axios 配置
 *  @param {string} action 签名动作
 *  @param {object} token 访问令牌
 *  @param {object} [opts = {}] 可配置项
 *  @param {object} [opts.config = {}] axios 配置
 *  @param {object} [opts.headers] http headers
 *  @param {object} [opts.query] 查询参数
 *  @param {object} [opts.params] 查询参数
 */
export default (action, token, opts = {}) => {
  let { config = {} } = opts;

  config.headers = {
    ...config.headers,
    ...genSignature(action, token),
    ...opts.headers
  };

  config.params = {
    ...config.params,
    ...opts.params,
    ...opts.query
  };

  return config;
};
