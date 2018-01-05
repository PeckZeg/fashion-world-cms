import {
  VIDEO_GET_FETCH_VIDEO_LIST,
  VIDEO_GET_FETCH_VIDEO_PROFILE,
  VIDEO_POST_PUBLISH_VIDEO,
  VIDEO_POST_RECOMMEND_VIDEO,
  VIDEO_POST_RECOVER_VIDEO,
  VIDEO_PUT_UPDATE_VIDEO,
  VIDEO_PUT_UPDATE_VIDEO_COVER,
  VIDEO_DEL_BLOCK_VIDEO,
  VIDEO_DEL_SUPPLANT_VIDEO,
  VIDEO_DEL_DESTROY_VIDEO
} from '@api/video';

/**
 *  [GET] 获取视频列表
 *  @this 当前组件实例
 *  @param {object} [params] 查询参数
 *  @returns {Promise}
 */
export function fetchVideoList(query) {
  return VIDEO_GET_FETCH_VIDEO_LIST(this.token(), query);
};

/**
 *  [GET] 获取视频信息
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export function fetchVideoProfile(videoId) {
  return VIDEO_GET_FETCH_VIDEO_PROFILE(this.token(), videoId);
};

/**
 *  [POST] 发布视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export function publishVideo(videoId, data) {
  return VIDEO_POST_PUBLISH_VIDEO(this.token(), videoId, data);
};

/**
 *  [POST] 推荐视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export function recommendVideo(videoId, data) {
  return VIDEO_POST_RECOMMEND_VIDEO(this.token(), videoId, data);
};

/**
 *  [POST] 恢复视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export function recoverVideo(videoId) {
  return VIDEO_POST_RECOVER_VIDEO(this.token(), videoId);
};

/**
 *  [PUT] 更新视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export function updateVideo(videoId, data) {
  return VIDEO_PUT_UPDATE_VIDEO(this.token(), videoId, data);
};

/**
 *  [PUT] 更新视频封面
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @param {object} [data] 内容数据
 *  @returns {Promise}
 */
export function updateVideoCover(videoId, data) {
  return VIDEO_PUT_UPDATE_VIDEO_COVER(this.token(), videoId, data);
};

/**
 *  [DEL] 冻结视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export function blockVideo(videoId) {
  return VIDEO_DEL_BLOCK_VIDEO(this.token(), videoId);
};

/**
 *  [DEL] 取消推荐视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export function supplantVideo(videoId) {
  return VIDEO_DEL_SUPPLANT_VIDEO(this.token(), videoId);
};

/**
 *  [DEL] 删除视频
 *  @this 当前组件实例
 *  @param {ObjectId} videoId 视频编号
 *  @returns {Promise}
 */
export function destroyVideo(videoId) {
  return VIDEO_DEL_DESTROY_VIDEO(this.token(), videoId);
};
