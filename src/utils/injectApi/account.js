import {
  ACCOUNT_GET_FETCH_ACCOUNT_LIST,
  ACCOUNT_GET_FETCH_ACCOUNT_PROFILE,
  ACCOUNT_POST_CREATE_ACCOUNT,
  ACCOUNT_POST_ACTIVE_ACCOUNT,
  ACCOUNT_POST_RECOVER_ACCOUNT,
  ACCOUNT_PUT_UPDATE_ACCOUNT,
  ACCOUNT_PUT_UPDATE_ACCOUNT_AVATAR,
  ACCOUNT_DEL_BLOCK_ACCOUNT,
  ACCOUNT_DEL_DESTROY_ACCOUNT
} from '@api/account';

/**
 *  [GET] 获取账号列表
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export function fetchAccountList(params) {
  return ACCOUNT_GET_FETCH_ACCOUNT_LIST(this.token(), params);
}

/**
 *  [GET] 获取账号信息
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export function fetchAccountProfile(accountId) {
  return ACCOUNT_GET_FETCH_ACCOUNT_PROFILE(this.token(), accountId);
}

/**
 *  [POST] 创建账号
 *  @param {object} data 创建参数
 *  @returns {Promise}
 */
export function createAccount(data) {
  return ACCOUNT_POST_CREATE_ACCOUNT(this.token(), data);
}

/**
 *  [POST] 激活账号
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export function activeAccount(accountId) {
  return ACCOUNT_POST_ACTIVE_ACCOUNT(this.token(), accountId);
}

/**
 *  [POST] 恢复账号
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export function recoverAccount(accountId) {
  return ACCOUNT_POST_RECOVER_ACCOUNT(this.token(), accountId);
}

/**
 *  [PUT] 更新账号
 *  @param {ObjectId} accountId 账号编号
 *  @param {object} data 修改内容
 *  @returns {Promise}
 */
export function updateAccount(accountId, data) {
  return ACCOUNT_PUT_UPDATE_ACCOUNT(this.token(), accountId, data);
}

/**
 *  [PUT] 更新账号头像
 *  @param {ObjectId} accountId 账号编号
 *  @param {object} data 修改内容
 *  @returns {Promise}
 */
export function updateAccountAvatar(accountId, key) {
  return ACCOUNT_PUT_UPDATE_ACCOUNT_AVATAR(this.token(), accountId, key);
}

/**
 *  [PUT] 冻结账号
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export function blockAccount(accountId) {
  return ACCOUNT_DEL_BLOCK_ACCOUNT(this.token(), accountId);
}

/**
 *  [PUT] 删除账号
 *  @param {ObjectId} accountId 账号编号
 *  @returns {Promise}
 */
export function destroyAccount(accountId) {
  return ACCOUNT_DEL_DESTROY_ACCOUNT(this.token(), accountId);
}
