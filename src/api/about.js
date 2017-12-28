import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/about' });

/**
 *  [GET] 获取关于信息列表
 *  @param {object} token 访问令牌
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export const ABOUT_GET_FETCH_ABOUT_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:about:get:fetch-about-list', token, { params })
  )
);

/**
 *  [GET] 获取关于信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} aboutId 关于信息编号
 *  @returns {Promise}
 */
export const ABOUT_GET_FETCH_ABOUT_PROFILE = (token, aboutId) => shimData(
  instance.get(
    `/${aboutId}`,
    genConfig('admin:about:get:fetch-about-profile', token)
  )
);

/**
 *  [POST] 创建关于信息
 *  @param {object} token 访问令牌
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const ABOUT_POST_CREATE_ABOUT = (token, data) => shimData(
  instance.post(
    '',
    data,
    genConfig('admin:about:post:create-about', token)
  )
);

/**
 *  [POST] 发布关于信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} aboutId 关于信息编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const ABOUT_POST_PUBLISH_ABOUT = (token, aboutId, data) => shimData(
  instance.post(
    `/${aboutId}/publish`,
    data,
    genConfig('admin:about:post:publish-about', token)
  )
);

/**
 *  [POST] 恢复关于信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} aboutId 关于信息编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const ABOUT_POST_RECOVER_ABOUT = (token, aboutId, data) => shimData(
  instance.post(
    `/${aboutId}`,
    data,
    genConfig('admin:about:post:recover-about', token)
  )
);

/**
 *  [PUT] 更新关于信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} aboutId 关于信息编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const ABOUT_PUT_UPDATE_ABOUT = (token, aboutId, data) => shimData(
  instance.put(
    `/${aboutId}`,
    data,
    genConfig('admin:about:put:update-about', token)
  )
);

/**
 *  [DEL] 冻结关于信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} aboutId 关于信息编号
 *  @returns {Promise}
 */
export const ABOUT_DEL_BLOCK_ABOUT = (token, aboutId) => shimData(
  instance.delete(
    `/${aboutId}/block`,
    genConfig('admin:about:del:block-about', token)
  )
);

/**
 *  [DEL] 删除关于信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} aboutId 关于信息编号
 *  @returns {Promise}
 */
export const ABOUT_DEL_DESTROY_ABOUT = (token, aboutId) => shimData(
  instance.delete(
    `/${aboutId}`,
    genConfig('admin:about:del:destroy-about', token)
  )
);
