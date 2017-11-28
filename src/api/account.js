import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/account' });

/**
 *  [GET] 获取账号列表
 *  @param {object} token 访问令牌
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export const ACCOUNT_GET_FETCH_ACCOUNT_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:account:fetch-account-list', token, { params })
  )
);

/**
 *  [GET] 获取账号信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export const ACCOUNT_GET_FETCH_ACCOUNT_PROFILE = (token, accountId) => shimData(
  instance.get(
    `/${accountId}`,
    genConfig('admin:account:fetch-account-profile', token)
  )
);

/**
 *  [POST] 创建账号
 *  @param {object} token 访问令牌
 *  @param {object} data 创建参数
 *  @returns {Promise}
 */
export const ACCOUNT_POST_CREATE_ACCOUNT = (token, data) => shimData(
  instance.post(
    '',
    data,
    genConfig('admin:account:create-account', token)
  )
);

/**
 *  [POST] 激活账号
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export const ACCOUNT_POST_ACTIVE_ACCOUNT = (token, accountId) => shimData(
  instance.post(
    `/${accountId}/active`,
    null,
    genConfig('admin:account:active-account', token)
  )
);

/**
 *  [POST] 恢复账号
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export const ACCOUNT_POST_RECOVER_ACCOUNT = (token, accountId) => shimData(
  instance.post(
    `/${accountId}`,
    null,
    genConfig('admin:account:recover-account', token)
  )
);

/**
 *  [PUT] 更新账号
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @param {object} data 修改内容
 *  @returns {Promise}
 */
export const ACCOUNT_PUT_UPDATE_ACCOUNT = (token, accountId, data) => shimData(
  instance.put(
    `/${accountId}`,
    data,
    genConfig('admin:account:update-account', token)
  )
);

/**
 *  [PUT] 更新账号头像
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @param {object} data 修改内容
 *  @returns {Promise}
 */
export const ACCOUNT_PUT_UPDATE_ACCOUNT_AVATAR = (token, accountId, data) => (
  shimData(
    instance.put(
      `/${accountId}/avatar`,
      data,
      genConfig('admin:account:update-account-avatar', token)
    )
  )
);

/**
 *  [PUT] 冻结账号
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export const ACCOUNT_DEL_BLOCK_ACCOUNT = (token, accountId) => shimData(
  instance.delete(
    `/${accountId}/block`,
    genConfig('admin:account:block-account', token)
  )
);

/**
 *  [PUT] 删除账号
 *  @param {object} token 访问令牌
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export const ACCOUNT_DEL_DESTROY_ACCOUNT = (token, accountId) => shimData(
  instance.delete(
    `/${accountId}`,
    genConfig('admin:account:destroy-account', token)
  )
);
