import axios from 'axios';

import genConfig from './utils/genConfig';
import shimData from './utils/shimData';

const instance = axios.create({ baseURL: '/api/admin/qiniu' });

/**
 *  [GET] 获取上传令牌
 *  @param {object} token 访问令牌
 *  @param {string} [filename] 文件名
 *  @returns {Promise}
 */
export const QINIU_GET_FETCH_UPLOAD_TOKEN = (token, filename) => shimData(
  instance.get(
    '/upload-token',
    genConfig('admin:qiniu:get:generate-upload-token', token, {
      params: { filename }
    })
  )
);
