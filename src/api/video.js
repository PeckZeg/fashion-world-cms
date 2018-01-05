import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/video' });

/**
 *  [GET] 获取视频列表
 *  @param {object} token 访问令牌
 *  @param {object} [params] 查询参数
 *  @returns {Promise}
 */
export const VIDEO_GET_FETCH_VIDEO_LIST = (token, params) => shimData(
  instance.get(
    '',
    genConfig('admin:video:fetch-video-list', token, { params })
  )
);

/**
 *  [GET] 获取视频信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export const VIDEO_GET_FETCH_VIDEO_PROFILE = (token, videoId) => shimData(
  instance.get(
    `/${videoId}`,
    genConfig('admin:video:fetch-video-profile', token)
  )
);

/**
 *  [POST] 发布视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export const VIDEO_POST_PUBLISH_VIDEO = (token, videoId, data) => shimData(
  instance.post(
    `/${videoId}/publish`,
    data,
    genConfig('admin:video:publish-video', token)
  )
);

/**
 *  [POST] 恢复视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export const VIDEO_POST_RECOVER_VIDEO = (token, videoId) => shimData(
  instance.post(
    `/${videoId}`,
    null,
    genConfig('admin:video:recover-video', token)
  )
);

/**
 *  [POST] 推荐视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export const VIDEO_POST_RECOMMEND_VIDEO = (token, videoId, data) => shimData(
  instance.post(
    `/${videoId}/recommend`,
    data,
    genConfig('admin:video:recommend-video', token)
  )
);

/**
 *  [PUT] 更新视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export const VIDEO_PUT_UPDATE_VIDEO = (token, videoId, data) => shimData(
  instance.post(
    `/${videoId}`,
    data,
    genConfig('admin:video:update-video', token)
  )
);

/**
 *  [PUT] 更新视频封面
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export const VIDEO_PUT_UPDATE_VIDEO_COVER = (token, videoId, data) => shimData(
  instance.post(
    `/${videoId}/cover`,
    data,
    genConfig('admin:video:update-video-cover', token)
  )
);

/**
 *  [DEL] 冻结视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export const VIDEO_DEL_BLOCK_VIDEO = (token, videoId) => shimData(
  instance.delete(
    `/${videoId}/block`,
    genConfig('admin:video:block-video', token)
  )
);

/**
 *  [DEL] 取消推荐视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export const VIDEO_DEL_SUPPLANT_VIDEO = (token, videoId) => shimData(
  instance.delete(
    `/${videoId}/supplant`,
    genConfig('admin:video:supplant-video', token)
  )
);

/**
 *  [DEL] 删除视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export const VIDEO_DEL_DESTROY_VIDEO = (token, videoId) => shimData(
  instance.delete(
    `/${videoId}`,
    genConfig('admin:video:destroy-video', token)
  )
);
