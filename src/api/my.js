import axios from 'axios';

// import genSignature from './utils/genSignature';
// import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/my' });

/**
 *  登录
 *  @param {string} name 登录名
 *  @param {string} password 密码
 *  @returns {Promise}
 */
export const MY_POST_LOGIN = (name, password) => (
  shimData(instance.post('/login', { name, password }))
);
