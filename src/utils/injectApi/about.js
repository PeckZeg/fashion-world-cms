import {
  ABOUT_GET_FETCH_ABOUT_LIST,
  ABOUT_GET_FETCH_ABOUT_PROFILE,
  ABOUT_POST_CREATE_ABOUT,
  ABOUT_POST_PUBLISH_ABOUT,
  ABOUT_POST_RECOVER_ABOUT,
  ABOUT_PUT_UPDATE_ABOUT,
  ABOUT_DEL_BLOCK_ABOUT,
  ABOUT_DEL_DESTROY_ABOUT
} from '@api/about';

/**
 *  [GET] 获取关于信息列表
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export function fetchAboutList(params) {
  return ABOUT_GET_FETCH_ABOUT_LIST(this.token(), params);
};

/**
 *  [GET] 获取关于信息
 *  @param {ObjectId} aboutId 关于信息编号
 *  @returns {Promise}
 */
export function fetchAboutProfile(aboutId) {
  return ABOUT_GET_FETCH_ABOUT_PROFILE(this.token(), aboutId);
};

/**
 *  [POST] 创建关于信息
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function createAbout(data) {
  return ABOUT_POST_CREATE_ABOUT(this.token(), data);
};

/**
 *  [POST] 发布关于信息
 *  @param {ObjectId} aboutId 关于信息编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function publishAbout(aboutId, data) {
  return ABOUT_POST_PUBLISH_ABOUT(this.token(), aboutId, data);
};

/**
 *  [POST] 恢复关于信息
 *  @param {ObjectId} aboutId 关于信息编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function recoverAbout(aboutId, data) {
  return ABOUT_POST_RECOVER_ABOUT(this.token(), aboutId, data);
};

/**
 *  [PUT] 更新关于信息
 *  @param {ObjectId} aboutId 关于信息编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function updateAbout(aboutId, data) {
  return ABOUT_PUT_UPDATE_ABOUT(this.token(), aboutId, data);
};

/**
 *  [DEL] 冻结关于信息
 *  @param {ObjectId} aboutId 关于信息编号
 *  @returns {Promise}
 */
export function blockAbout(aboutId) {
  return ABOUT_DEL_BLOCK_ABOUT(this.token(), aboutId);
};

/**
 *  [DEL] 删除关于信息
 *  @param {ObjectId} aboutId 关于信息编号
 *  @returns {Promise}
 */
export function destroyAbout(aboutId) {
  return ABOUT_DEL_DESTROY_ABOUT(this.token(), aboutId);
};
