import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/channel' });

/**
 *  [GET] 获取频道列表
 *  @param {object} token 访问令牌
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export const CHANNEL_GET_FETCH_CHANNEL_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:channel:fetch-channel-list', token, { params })
  )
);

/**
 *  [GET] 获取频道信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export const CHANNEL_GET_FETCH_CHANNEL_PROFILE = (token, channelId) => shimData(
  instance.get(
    `/${channelId}`,
    genConfig('admin:channel:fetch-channel-profile', token)
  )
);

/**
 *  [POST] 创建频道
 *  @param {object} token 访问令牌
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const CHANNEL_POST_CREATE_CHANNEL = (token, data) => shimData(
  instance.post(
    '',
    data,
    genConfig('admin:channel:create-channel', token)
  )
);

/**
 *  [POST] 发布频道
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export const CHANNEL_POST_PUBLISH_CHANNEL = (token, channelId) => shimData(
  instance.post(
    `/${channelId}/publish`,
    null,
    genConfig('admin:channel:publish-channel', token)
  )
);

/**
 *  [POST] 恢复频道
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export const CHANNEL_POST_RECOVER_CHANNEL = (token, channelId) => shimData(
  instance.post(
    `/${channelId}`,
    null,
    genConfig('admin:channel:recover-channel', token)
  )
);

/**
 *  [PUT] 更新频道
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @param {object} data 更新数据
 *  @returns {Promise}
 */
export const CHANNEL_PUT_UPDATE_CHANNEL = (token, channelId, data) => shimData(
  instance.put(
    `/${channelId}`,
    data,
    genConfig('admin:channel:update-channel', token)
  )
);

/**
 *  [PUT] 更新频道封面
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @param {string} key 封面键
 *  @returns {Promise}
 */
export const CHANNEL_PUT_UPDATE_CHANNEL_COVER = (token, channelId, key) => shimData(
  instance.put(
    `/${channelId}`,
    { key },
    genConfig('admin:channel:update-channel-cover', token)
  )
);

/**
 *  [DEL] 冻结频道
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export const CHANNEL_DEL_BLOCK_CHANNEL = (token, channelId) => shimData(
  instance.delete(
    `/${channelId}/block`,
    genConfig('admin:channel:block-channel', token)
  )
);

/**
 *  [DEL] 删除频道
 *  @param {object} token 访问令牌
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export const CHANNEL_DEL_DESTROY_CHANNEL = (token, channelId) => shimData(
  instance.delete(
    `/${channelId}`,
    genConfig('admin:channel:destroy-channel', token)
  )
);
