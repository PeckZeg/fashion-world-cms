import axios from 'axios';

/**
 *  获取七牛视频元信息
 *  @param {string} av 视频地址
 *  @returns {Promise}
 */
export default av => axios({
  url: `${av}?avinfo`,
  json: true
}).then(({ data }) => data);
