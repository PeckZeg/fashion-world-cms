import {
  VERSION_GET_FETCH_VERSION_LIST,
  VERSION_GET_FETCH_VERSION_PROFILE,
  VERSION_POST_CREATE_VERSION,
  VERSION_POST_PUBLISH_VERSION,
  VERSION_POST_RECOVER_VERSION,
  VERSION_PUT_UPDATE_VERSION,
  VERSION_PUT_UPDATE_VERSION_COVER,
  VERSION_DEL_BLOCK_VERSION,
  VERSION_DEL_DESTROY_VERSION
} from '@api/version';

/**
 *  [GET] 获取版本列表
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export function fetchVersionList(params) {
  return VERSION_GET_FETCH_VERSION_LIST(this.token(), params);
};

/**
 *  [GET] 获取版本信息
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export function fetchVersionProfile(versionId) {
  return VERSION_GET_FETCH_VERSION_PROFILE(this.token(), versionId);
};

/**
 *  [POST] 创建版本
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function createVersion(data) {
  return VERSION_POST_CREATE_VERSION(this.token(), data);
};

/**
 *  [POST] 发布版本
 *  @param {ObjectId} versionId 版本编号
 *  @param {object} [data] body 数据
 *  @returns {Promise}
 */
export function publishVersion(versionId, data) {
  return VERSION_POST_PUBLISH_VERSION(this.token(), versionId, data);
};

/**
 *  [POST] 恢复版本
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export function recoverVersion(versionId) {
  return VERSION_POST_RECOVER_VERSION(this.token(), versionId);
};

/**
 *  [PUT] 更新版本
 *  @param {ObjectId} versionId 版本编号
 *  @param {object} data 更新数据
 *  @returns {Promise}
 */
export function updateVersion(versionId, data) {
  return VERSION_PUT_UPDATE_VERSION(this.token(), versionId, data);
};

/**
 *  [PUT] 更新版本封面
 *  @param {ObjectId} versionId 版本编号
 *  @param {string} key 封面键
 *  @returns {Promise}
 */
export function updateVersionCover(versionId, key) {
  return VERSION_PUT_UPDATE_VERSION_COVER(this.token(), versionId, key);
};

/**
 *  [DEL] 冻结版本
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export function blockVersion(versionId) {
  return VERSION_DEL_BLOCK_VERSION(this.token(), versionId);
};

/**
 *  [DEL] 删除版本
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export function destroyVersion(versionId) {
  return VERSION_DEL_DESTROY_VERSION(this.token(), versionId);
};
