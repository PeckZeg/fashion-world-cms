import React from 'react';

import genItems from '~/src/components/Docs/const/siders/genItems';

import * as DEL_LOGOUT from '~/src/components/Docs/Api/My/del/logout';
import * as POST_LOGIN from '~/src/components/Docs/Api/My/post/login';

export const key = 'my';
export const icon = 'user';
export const label = '个人中心';
export const items = genItems(
  POST_LOGIN,
  DEL_LOGOUT
);
