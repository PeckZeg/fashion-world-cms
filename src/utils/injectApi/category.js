import {
  CATEGORY_GET_FETCH_CATEGORY_LIST,
  CATEGORY_GET_FETCH_CATEGORY_PROFILE,
  CATEGORY_POST_CREATE_CATEGORY,
  CATEGORY_POST_PUBLISH_CATEGORY,
  CATEGORY_POST_RECOVER_CATEGORY,
  CATEGORY_PUT_UPDATE_CATEGORY,
  CATEGORY_PUT_UPDATE_CATEGORY_COVER,
  CATEGORY_DEL_BLOCK_CATEGORY,
  CATEGORY_DEL_DESTROY_CATEGORY
} from '@api/category';

/**
 *  [GET] 获取分类列表
 *  @param {object} [params] 查询参数
 *  @returns {Promise}
 */
export function fetchCategoryList(params) {
  return CATEGORY_GET_FETCH_CATEGORY_LIST(this.token(), params);
};

/**
 *  [GET] 获取分类信息
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export function fetchCategoryProfile(categoryId) {
  return CATEGORY_GET_FETCH_CATEGORY_PROFILE(this.token(), categoryId);
};

/**
 *  [POST] 创建分类
 *  @param {object} data 创建参数
 *  @returns {Promise}
 */
export function createCategory(data) {
  return CATEGORY_POST_CREATE_CATEGORY(this.token(), data);
};

/**
 *  [POST] 发布分类
 *  @param {ObjectId} categoryId 分类编号
 *  @param {object} [data] 内容数据
 *  @param {Date} [data.publishAt] 发布时间
 *  @returns {Promise}
 */
export function publishCategory(categoryId, data) {
  return CATEGORY_POST_PUBLISH_CATEGORY(this.token(), categoryId, data);
};

/**
 *  [POST] 恢复分类
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export function recoverCategory(categoryId) {
  return CATEGORY_POST_RECOVER_CATEGORY(this.token(), categoryId);
};

/**
 *  [PUT] 更新分类信息
 *  @param {ObjectId} categoryId 分类编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export function updateCategory(categoryId, data) {
  return CATEGORY_PUT_UPDATE_CATEGORY(this.token(), categoryId, data);
};

/**
 *  [PUT] 更新分类封面
 *  @param {ObjectId} categoryId 分类编号
 *  @param {string} key 七牛存储键
 *  @returns {Promise}
 */
export function updateCategoryCover(categoryId, key) {
  return CATEGORY_PUT_UPDATE_CATEGORY_COVER(this.token(), categoryId, key);
};

/**
 *  [DEL] 冻结分类
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export function blockCategory(categoryId) {
  return CATEGORY_DEL_BLOCK_CATEGORY(this.token(), categoryId);
};

/**
 *  [DEL] 删除分类
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export function destroyCategory(categoryId) {
  return CATEGORY_DEL_DESTROY_CATEGORY(this.token(), categoryId);
};
