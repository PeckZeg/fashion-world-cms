import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/banner' });

/**
 *  [GET] 获取横幅栏列表
 *  @param {object} token 访问令牌
 *  @param {object} [params] 查询参数
 *  @returns {Promise}
 */
export const BANNER_GET_FETCH_BANNER_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:banner:fetch-banner-list', token, { params })
  )
);

/**
 *  [GET] 获取横幅栏列表
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏列表
 *  @returns {Promise}
 */
export const BANNER_GET_FETCH_BANNER_PROFILE = (token, bannerId) => shimData(
  instance.get(
    `/${bannerId}`,
    genConfig('admin:banner:fetch-banner-profile', token)
  )
);

/**
 *  [POST] 创建横幅栏
 *  @param {object} token 访问令牌
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const BANNER_POST_CREATE_BANNER = (token, data) => shimData(
  instance.post(
    '',
    data,
    genConfig('admin:banner:create-banner', token)
  )
);

/**
 *  [POST] 发布横幅栏
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const BANNER_POST_PUBLISH_BANNER = (token, bannerId, data) => shimData(
  instance.post(
    `/${bannerId}/publish`,
    data,
    genConfig('admin:banner:publish-banner', token)
  )
);

/**
 *  [POST] 恢复横幅栏
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @returns {Promise}
 */
export const BANNER_POST_RECOVER_BANNER = (token, bannerId) => shimData(
  instance.post(
    `/${bannerId}`,
    null,
    genConfig('admin:banner:recover-banner', token)
  )
);

/**
 *  [PUT] 更新横幅栏
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const BANNER_PUT_UPDATE_BANNER = (token, bannerId, data) => shimData(
  instance.put(
    `/${bannerId}`,
    data,
    genConfig('admin:banner:update-banner', token)
  )
);

/**
 *  [PUT] 更新横幅栏封面
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @param {string} key 七牛存储键
 *  @returns {Promise}
 */
export const BANNER_PUT_UPDATE_BANNER_COVER = (token, bannerId, key) => (
  shimData(
    instance.put(
      `/${bannerId}/cover`,
      { key },
      genConfig('admin:banner:update-banner-cover', token)
    )
  )
);

/**
 *  [DEL] 冻结横幅栏
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @returns {Promise}
 */
export const BANNER_DEL_BLOCK_BANNER = (token, bannerId) => shimData(
  instance.delete(
    `/${bannerId}/block`,
    genConfig('admin:banner:block-banner', token)
  )
);

/**
 *  [DEL] 删除横幅栏
 *  @param {object} token 访问令牌
 *  @param {ObjectId} bannerId 横幅栏编号
 *  @returns {Promise}
 */
export const BANNER_DEL_DESTROY_BANNER = (token, bannerId) => shimData(
  instance.delete(
    `/${bannerId}`,
    genConfig('admin:banner:destroy-banner', token)
  )
);
