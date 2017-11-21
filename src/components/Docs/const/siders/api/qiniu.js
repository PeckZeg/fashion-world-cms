import React from 'react';

import genItems from '~/src/components/Docs/const/siders/genItems';

import * as GET_GEN_UPLOAD_TOKEN from '~/src/components/Docs/Api/Qiniu/get/genUploadToken';

export const key = 'qiniu';
export const icon = 'api';
export const label = '七牛';
export const items = genItems(
  GET_GEN_UPLOAD_TOKEN
);
