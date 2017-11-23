import genItems from '@docs/const/siders/genItems';

import * as PUT_UPDATE_MY_PROFILE from '@api-docs/My/put/updateMyProfile';
import * as PUT_UPDATE_MY_AVATAR from '@api-docs/My/put/updateMyAvatar';
import * as GET_FETCH_MY_PROFILE from '@api-docs/My/get/fetchMyProfile';
import * as DEL_LOGOUT from '@api-docs/My/del/logout';
import * as POST_LOGIN from '@api-docs/My/post/login';

export { key, icon, label } from '@api-docs/My';

export const items = genItems(
  GET_FETCH_MY_PROFILE,
  POST_LOGIN,
  PUT_UPDATE_MY_PROFILE,
  PUT_UPDATE_MY_AVATAR,
  DEL_LOGOUT
);
