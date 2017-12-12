import {
  CHANNEL_GET_FETCH_CHANNEL_LIST,
  CHANNEL_GET_FETCH_CHANNEL_PROFILE,
  CHANNEL_POST_CREATE_CHANNEL,
  CHANNEL_POST_PUBLISH_CHANNEL,
  CHANNEL_POST_RECOVER_CHANNEL,
  CHANNEL_PUT_UPDATE_CHANNEL,
  CHANNEL_PUT_UPDATE_CHANNEL_COVER,
  CHANNEL_DEL_BLOCK_CHANNEL,
  CHANNEL_DEL_DESTROY_CHANNEL
} from '@api/channel';

/**
 *  [GET] 获取频道列表
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export function fetchChannelList(params) {
  return CHANNEL_GET_FETCH_CHANNEL_LIST(this.token(), params);
};

/**
 *  [GET] 获取频道信息
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export function fetchChannelProfile(channelId) {
  return CHANNEL_GET_FETCH_CHANNEL_PROFILE(this.token(), channelId);
};

/**
 *  [POST] 创建频道
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function createChannel(data) {
  return CHANNEL_POST_CREATE_CHANNEL(this.token(), data);
};

/**
 *  [POST] 发布频道
 *  @param {ObjectId} channelId 频道编号
 *  @param {object} data body 数据
 *  @returns {Promise}
 */
export function publishChannel(channelId, data) {
  return CHANNEL_POST_PUBLISH_CHANNEL(this.token(), channelId, data);
};

/**
 *  [POST] 恢复频道
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export function recoverChannel(channelId) {
  return CHANNEL_POST_RECOVER_CHANNEL(this.token(), channelId);
};

/**
 *  [PUT] 更新频道
 *  @param {ObjectId} channelId 频道编号
 *  @param {object} data 更新数据
 *  @returns {Promise}
 */
export function updateChannel(channelId, data) {
  return CHANNEL_PUT_UPDATE_CHANNEL(this.token(), channelId, data);
};

/**
 *  [PUT] 更新频道封面
 *  @param {ObjectId} channelId 频道编号
 *  @param {string} key 封面键
 *  @returns {Promise}
 */
export function updateChannelCover(channelId, key) {
  return CHANNEL_PUT_UPDATE_CHANNEL_COVER(this.token(), channelId, key);
};

/**
 *  [DEL] 冻结频道
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export function blockChannel(channelId) {
  return CHANNEL_DEL_BLOCK_CHANNEL(this.token(), channelId);
};

/**
 *  [DEL] 删除频道
 *  @param {ObjectId} channelId 频道编号
 *  @returns {Promise}
 */
export function destroyChannel(channelId) {
  return CHANNEL_DEL_DESTROY_CHANNEL(this.token(), channelId);
};
