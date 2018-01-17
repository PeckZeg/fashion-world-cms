import {
  LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_LIST,
  LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_PROFILE,
  LOOP_VIDEO_POST_PUBLISH_LOOP_VIDEO,
  LOOP_VIDEO_POST_RECOVER_LOOP_VIDEO,
  LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO,
  LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO_COVER,
  LOOP_VIDEO_DEL_BLOCK_LOOP_VIDEO,
  LOOP_VIDEO_DEL_DESTROY_LOOP_VIDEO
} from '@api/loopVideo';

/**
 *  [GET] 获取循环视频列表
 *  @param {object} params 查询参数
 *  @returns {Promise}
 */
export function fetchLoopVideoList(params) {
  return LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_LIST(this.token(), params);
};

/**
 *  [GET] 获取循环视频信息
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export function fetchLoopVideoProfile(id) {
  return LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_PROFILE(this.token(), id);
};

/**
 *  [POST] 发布循环视频
 *  @param {ObjectId} id 循环视频编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function publishLoopVideo(id, data) {
  return LOOP_VIDEO_POST_PUBLISH_LOOP_VIDEO(this.token(), id, data);
};

/**
 *  [POST] 恢复循环视频
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export function recoverLoopVideo(id) {
  return LOOP_VIDEO_POST_RECOVER_LOOP_VIDEO(this.token(), id);
};

/**
 *  [PUT] 更新循环视频
 *  @param {ObjectId} id 循环视频编号
 *  @param {object} data 内容数据
 *  @returns {Promise}
 */
export function updateLoopVideo(id, data) {
  return LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO(this.token(), id, data);
};

/**
 *  [PUT] 更新循环视频封面
 *  @param {ObjectId} id 循环视频编号
 *  @param {string} key 七牛存储键
 *  @returns {Promise}
 */
export function updateLoopVideoCover(id, key) {
  return LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO_COVER(this.token(), id, key);
};

/**
 *  [DEL] 冻结循环视频
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export function blockLoopVideo(id) {
  return LOOP_VIDEO_DEL_BLOCK_LOOP_VIDEO(this.token(), id);
};

/**
 *  [DEL] 删除循环视频
 *  @param {ObjectId} id 循环视频编号
 *  @returns {Promise}
 */
export function destroyLoopVideo(id) {
  return LOOP_VIDEO_DEL_DESTROY_LOOP_VIDEO(this.token(), id);
};
