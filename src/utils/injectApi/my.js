import {
  MY_GET_FETCH_MY_PROFILE,
  MY_POST_LOGIN,
  MY_DEL_LOGOUT
} from '~/src/api/my';

/**
 *  [GET] 获取当前登录账号的信息
 *  @returns {Promise}
 */
export function fetchMyProfile() {
  return MY_GET_FETCH_MY_PROFILE(this.token());
}

/**
 *  [POST] 登录
 *  @param {string} name 登录名
 *  @param {string} password 密码
 *  @returns {Promise}
 */
export function login(name, password) {
  return MY_POST_LOGIN(name, password);
};

/**
 *  [DEL] 登出
 *  @returns {Promise}
 */
export function logout() {
  return MY_DEL_LOGOUT(this.token());
}
