import axios from 'axios';

// import genSignature from './utils/genSignature';
import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/my' });

/**
 *  [POST] 登录
 *  @param {string} name 登录名
 *  @param {string} password 密码
 *  @returns {Promise}
 */
export const MY_POST_LOGIN = (name, password) => (
  shimData(instance.post('/login', { name, password }))
);

/**
 *  [DEL] 登出
 *  @param {object} token 访问令牌
 *  @returns {Promise}
 */
export const MY_DEL_LOGOUT = token => shimData(
  instance.delete('/logout', genConfig('admin:my:logout', token))
);
