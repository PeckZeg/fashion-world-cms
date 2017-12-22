import {
  USER_GET_FETCH_USER_LIST,
  USER_GET_FETCH_USER_PROFILE,
  USER_PUT_UPDATE_USER,
  USER_PUT_UPDATE_USER_AVATAR
} from '@api/user';

/**
 *  [GET] 获取用户列表
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export function fetchUserList(params) {
  return USER_GET_FETCH_USER_LIST(this.token(), params);
};

/**
 *  [GET] 获取用户信息
 *  @param {ObjectId} userId 用户编号
 *  @returns {Promise}
 */
export function fetchUserProfile(userId) {
  return USER_GET_FETCH_USER_PROFILE(this.token(), userId);
};

/**
 *  [PUT] 更新用户信息
 *  @param {ObjectId} userId 用户编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function updateUser(userId, data) {
  return USER_PUT_UPDATE_USER(this.token(), userId, data);
};

/**
 *  [PUT] 更新用户头像
 *  @param {ObjectId} userId 用户编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function updateUserAvatar(userId, data) {
  return USER_PUT_UPDATE_USER_AVATAR(this.token(), userId, data);
};
