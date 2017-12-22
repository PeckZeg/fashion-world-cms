import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/user' });

/**
 *  [GET] 获取用户列表
 *  @param {object} token 访问令牌
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export const USER_GET_FETCH_USER_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:user:fetch-user-list', token, { params })
  )
);

/**
 *  [GET] 获取用户信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} userId 用户编号
 *  @returns {Promise}
 */
export const USER_GET_FETCH_USER_PROFILE = (token, userId) => shimData(
  instance.get(
    `/${userId}`,
    genConfig('admin:user:fetch-user-profile', token)
  )
);

/**
 *  [PUT] 更新用户信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} userId 用户编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const USER_PUT_UPDATE_USER = (token, userId, data) => shimData(
  instance.put(
    `/${userId}`,
    data,
    genConfig('admin:user:update-user', token)
  )
);

/**
 *  [PUT] 更新用户头像
 *  @param {object} token 访问令牌
 *  @param {ObjectId} userId 用户编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const USER_PUT_UPDATE_USER_AVATAR = (token, userId, data) => shimData(
  instance.put(
    `/${userId}/avatar`,
    data,
    genConfig('admin:user:update-user-avatar', token)
  )
);
