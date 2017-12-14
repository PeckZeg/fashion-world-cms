import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/category' });

/**
 *  [GET] 获取分类列表
 *  @param {object} token 访问令牌
 *  @param {object} [params] 查询参数
 *  @returns {Promise}
 */
export const CATEGORY_GET_FETCH_CATEGORY_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:category:fetch-category-list', token, { params })
  )
);

/**
 *  [GET] 获取分类信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export const CATEGORY_GET_FETCH_CATEGORY_PROFILE = (token, categoryId) => (
  shimData(
    instance.get(
      `/${categoryId}`,
      genConfig('admin:category:fetch-category-profile', token)
    )
  )
);

/**
 *  [POST] 创建分类
 *  @param {object} token 访问令牌
 *  @param {object} data 创建参数
 *  @returns {Promise}
 */
export const CATEGORY_POST_CREATE_CATEGORY = (token, data) => shimData(
  instance.post(
    '',
    data,
    genConfig('admin:category:create-category', token)
  )
);

/**
 *  [POST] 发布分类
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @param {object} [data] 内容数据
 *  @param {Date} [data.publishAt] 发布时间
 *  @returns {Promise}
 */
export const CATEGORY_POST_PUBLISH_CATEGORY = (token, categoryId, data) => (
  shimData(
    instance.post(
      `/${categoryId}/publish`,
      data,
      genConfig('admin:category:publish-category', token)
    )
  )
);

/**
 *  [POST] 恢复分类
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export const CATEGORY_POST_RECOVER_CATEGORY = (token, categoryId) => (
  shimData(
    instance.post(
      `/${categoryId}`,
      null,
      genConfig('admin:category:recover-category', token)
    )
  )
);

/**
 *  [PUT] 更新分类信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export const CATEGORY_PUT_UPDATE_CATEGORY = (token, categoryId, data) => (
  shimData(
    instance.put(
      `/${categoryId}`,
      data,
      genConfig('admin:category:update-category', token)
    )
  )
);

/**
 *  [PUT] 更新分类封面
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @param {string} key 七牛存储键
 *  @returns {Promise}
 */
export const CATEGORY_PUT_UPDATE_CATEGORY_COVER = (token, categoryId, key) => (
  shimData(
    instance.put(
      `/${categoryId}`,
      { key },
      genConfig('admin:category:update-category-cover', token)
    )
  )
);

/**
 *  [DEL] 冻结分类
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export const CATEGORY_DEL_BLOCK_CATEGORY = (token, categoryId) => shimData(
  instance.delete(
    `/${categoryId}/block`,
    genConfig('admin:category:block-category', token)
  )
);

/**
 *  [DEL] 删除分类
 *  @param {object} token 访问令牌
 *  @param {ObjectId} categoryId 分类编号
 *  @returns {Promise}
 */
export const CATEGORY_DEL_DESTROY_CATEGORY = (token, categoryId) => shimData(
  instance.delete(
    `/${categoryId}`,
    genConfig('admin:category:destroy-category', token)
  )
);
