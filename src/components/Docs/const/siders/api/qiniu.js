import React from 'react';

import genItems from '~/src/components/Docs/const/siders/genItems';

import * as GET_GEN_UPLOAD_TOKEN from '~/src/components/Docs/Api/Qiniu/get/genUploadToken';

export { key, icon, label } from '~/src/components/Docs/Api/Qiniu';
export const items = genItems(
  GET_GEN_UPLOAD_TOKEN
);
