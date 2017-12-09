import TinyQiniu from 'tiny-qiniu';

import isFunction from 'lodash/isFunction';

import catchError from '~/src/utils/catchError';

const zone = 'z2';

/**
 *  自定义请求
 *  @param {React.Component} com 当前组件实例
 *  @param {React.Component} uploader 上传组件实例
 *  @param customRequest 自定义请求参数
 *  @param {Function} afterUpload async Function(key, uploader, customRequest)
 */
export default async function(com, uploader, customRequest, next) {
  try {
    const { bucket, key, host, uptoken } = await com.fetchUploadToken();
    const tinyQiniu = new TinyQiniu({ bucket, baseURL: host, uptoken, zone });
    const { file, onProgress, onSuccess, onError } = customRequest;

    try {
      uploader.onStart();

      await tinyQiniu.uploadFile(file, {
        key,
        onProgress: e => onProgress({ percent: e.loaded / e.total })
      });

      if (isFunction(next)) {
        await next(key, uploader, customRequest);
      }

      uploader.onSuccess();
      onSuccess();
    }

    catch (err) {
      onError(err);
      uploader.onError(err);
      catchError(com, err);
    }
  }

  catch (err) {
    catchError(com, err);
  }
};
