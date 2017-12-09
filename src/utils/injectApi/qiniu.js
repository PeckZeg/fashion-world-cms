import {
  QINIU_GET_FETCH_UPLOAD_TOKEN
} from '@api/qiniu';

export function fetchUploadToken(filename) {
  return QINIU_GET_FETCH_UPLOAD_TOKEN(this.token(), filename);
};
