import React from 'react';

import genItems from '~/src/components/Docs/const/siders/genItems';

import * as PUT_UPDATE_MY_PROFILE from '~/src/components/Docs/Api/My/put/updateMyProfile';
import * as PUT_UPDATE_MY_AVATAR from '~/src/components/Docs/Api/My/put/updateMyAvatar';
import * as GET_FETCH_MY_PROFILE from '~/src/components/Docs/Api/My/get/fetchMyProfile';
import * as DEL_LOGOUT from '~/src/components/Docs/Api/My/del/logout';
import * as POST_LOGIN from '~/src/components/Docs/Api/My/post/login';

export const key = 'my';
export const icon = 'user';
export const label = '个人中心';
export const items = genItems(
  GET_FETCH_MY_PROFILE,
  POST_LOGIN,
  PUT_UPDATE_MY_PROFILE,
  PUT_UPDATE_MY_AVATAR,
  DEL_LOGOUT
);
