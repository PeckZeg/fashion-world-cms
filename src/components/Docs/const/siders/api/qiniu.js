import React from 'react';

import genItems from '@docs/const/siders/genItems';

import * as GET_GEN_UPLOAD_TOKEN from '@api-docs/Qiniu/get/genUploadToken';

export { key, icon, label } from '@api-docs/Qiniu';
export const items = genItems(
  GET_GEN_UPLOAD_TOKEN
);
