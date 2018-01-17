import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/loop-video' });

/**
 *  [GET] 获取循环视频列表
 *  @param {object} token 访问令牌
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export const LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_LIST = (token, params) => (
  shimData(
    instance.get(
      '',
      genConfig('admin:loop-video:fetch-loop-video-list', token, { params })
    )
  )
);

/**
 *  [GET] 获取循环视频信息
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export const LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_PROFILE = (token, id) => (
  shimData(
    instance.get(
      `/${id}`,
      genConfig('admin:loop-video:fetch-loop-video-profile', token)
    )
  )
);

/**
 *  [POST] 发布循环视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const LOOP_VIDEO_POST_PUBLISH_LOOP_VIDEO = (token, id, data) => (
  shimData(
    instance.post(
      `/${id}/publish`,
      data,
      genConfig('admin:loop-video:publish-loop-video', token)
    )
  )
);

/**
 *  [POST] 恢复循环视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export const LOOP_VIDEO_POST_RECOVER_LOOP_VIDEO = (token, id) => shimData(
  instance.post(
    `/${id}`,
    null,
    genConfig('admin:loop-video:recover-loop-video', token)
  )
);

/**
 *  [PUT] 更新循环视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export const LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO = (token, id, data) => shimData(
  instance.put(
    `/${id}`,
    data,
    genConfig('admin:loop-video:update-loop-video', token)
  )
);

/**
 *  [PUT] 更新循环视频封面
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @param {string} key 七牛存储键
 *  @returns {Promise}
 */
export const LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO_COVER = (token, id, key) => (
  shimData(
    instance.put(
      `/${id}/cover`,
      { key },
      genConfig('admin:loop-video:update-loop-video-cover', token)
    )
  )
);

/**
 *  [DEL] 冻结循环视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export const LOOP_VIDEO_DEL_BLOCK_LOOP_VIDEO = (token, id) => shimData(
  instance.delete(
    `/${id}/block`,
    genConfig('admin:loop-video:block-loop-video', token)
  )
);

/**
 *  [DEL] 删除循环视频
 *  @param {object} token 访问令牌
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export const LOOP_VIDEO_DEL_DESTROY_LOOP_VIDEO = (token, id) => shimData(
  instance.delete(
    `/${id}`,
    genConfig('admin:loop-video:destroy-loop-video', token)
  )
);
