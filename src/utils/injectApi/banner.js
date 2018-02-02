import {
  BANNER_GET_FETCH_BANNER_LIST,
  BANNER_GET_FETCH_BANNER_PROFILE,
  BANNER_POST_CREATE_BANNER,
  BANNER_POST_PUBLISH_BANNER,
  BANNER_POST_RECOVER_BANNER,
  BANNER_PUT_UPDATE_BANNER,
  BANNER_PUT_UPDATE_BANNER_COVER,
  BANNER_DEL_BLOCK_BANNER,
  BANNER_DEL_DESTROY_BANNER
} from '@api/banner';

/**
 *  [GET] 获取横幅栏列表
 *  @param {object} [params] 查询参数
 *  @returns {Promise}
 */
export function fetchBannerList(params) {
  return BANNER_GET_FETCH_BANNER_LIST(this.token(), params);
};

/**
 *  [GET] 获取横幅栏列表
 *  @param {ObjectId} bannerId 横幅栏列表
 *  @returns {Promise}
 */
export function fetchBannerProfile(bannerId) {
  return BANNER_GET_FETCH_BANNER_PROFILE(this.token(), bannerId);
};

/**
 *  [POST] 创建横幅栏
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function createBanner(data) {
  return BANNER_POST_CREATE_BANNER(this.token(), data);
};

/**
 *  [POST] 发布横幅栏
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function publishBanner(bannerId, data) {
  return BANNER_POST_PUBLISH_BANNER(this.token(), bannerId, data);
};

/**
 *  [POST] 恢复横幅栏
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @returns {Promise}
 */
export function recoverBanner(bannerId) {
  return BANNER_POST_RECOVER_BANNER(this.token(), bannerId);
};

/**
 *  [PUT] 更新横幅栏
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function updateBanner(bannerId, data) {
  return BANNER_PUT_UPDATE_BANNER(this.token(), bannerId, data);
};

/**
 *  [PUT] 更新横幅栏封面
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @param {string} key 七牛存储键
 *  @returns {Promise}
 */
export function updateBannerCover(bannerId, key) {
  return BANNER_PUT_UPDATE_BANNER_COVER(this.token(), bannerId, key);
};

/**
 *  [DEL] 冻结横幅栏
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @returns {Promise}
 */
export function blockBanner(bannerId) {
  return BANNER_DEL_BLOCK_BANNER(this.token(), bannerId);
};

/**
 *  [DEL] 删除横幅栏
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @returns {Promise}
 */
export function destroyBanner(bannerId) {
  return BANNER_DEL_DESTROY_BANNER(this.token(), bannerId);
};
