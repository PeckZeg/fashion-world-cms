import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/version' });

/**
 *  [GET] 获取版本列表
 *  @param {object} token 访问令牌
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export const VERSION_GET_FETCH_VERSION_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:version:fetch-version-list', token, { params })
  )
);

/**
 *  [GET] 获取版本信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export const VERSION_GET_FETCH_VERSION_PROFILE = (token, versionId) => (
  shimData(
    instance.get(
      `/${versionId}`,
      genConfig('admin:version:fetch-version-profile', token)
    )
  )
);

/**
 *  [POST] 创建版本
 *  @param {object} token 访问令牌
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const VERSION_POST_CREATE_VERSION = (token, data) => shimData(
  instance.post(
    '',
    data,
    genConfig('admin:version:create-version', token)
  )
);

/**
 *  [POST] 发布版本
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @param {object} [data] body 数据
 *  @returns {Promise}
 */
export const VERSION_POST_PUBLISH_VERSION = (token, versionId, data) => (
  shimData(
    instance.post(
      `/${versionId}/publish`,
      data,
      genConfig('admin:version:publish-version', token)
    )
  )
);

/**
 *  [POST] 恢复版本
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export const VERSION_POST_RECOVER_VERSION = (token, versionId) => shimData(
  instance.post(
    `/${versionId}`,
    null,
    genConfig('admin:version:recover-version', token)
  )
);

/**
 *  [PUT] 更新版本
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @param {object} data 更新数据
 *  @returns {Promise}
 */
export const VERSION_PUT_UPDATE_VERSION = (token, versionId, data) => (
  shimData(
    instance.put(
      `/${versionId}`,
      data,
      genConfig('admin:version:update-version', token)
    )
  )
);

/**
 *  [PUT] 更新版本封面
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @param {string} key 封面键
 *  @returns {Promise}
 */
export const VERSION_PUT_UPDATE_VERSION_COVER = (token, versionId, key) => (
  shimData(
    instance.put(
      `/${versionId}/cover`,
      { key },
      genConfig('admin:version:update-version-cover', token)
    )
  )
);

/**
 *  [DEL] 冻结版本
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export const VERSION_DEL_BLOCK_VERSION = (token, versionId) => shimData(
  instance.delete(
    `/${versionId}/block`,
    genConfig('admin:version:block-version', token)
  )
);

/**
 *  [DEL] 删除版本
 *  @param {object} token 访问令牌
 *  @param {ObjectId} versionId 版本编号
 *  @returns {Promise}
 */
export const VERSION_DEL_DESTROY_VERSION = (token, versionId) => shimData(
  instance.delete(
    `/${versionId}`,
    genConfig('admin:version:destroy-version', token)
  )
);
