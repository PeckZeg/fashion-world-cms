import genItems from '~/src/components/Docs/const/siders/genItems';

import * as GET_FETCH_ACCOUNT_PROFILE from '~/src/components/Docs/Api/Account/get/fetchAccountProfile';
import * as GET_FETCH_ACCOUNT_LIST from '~/src/components/Docs/Api/Account/get/fetchAccountList';
import * as PUT_UPDATE_ACCOUNT from '~/src/components/Docs/Api/Account/put/updateAccountProfile';
import * as POST_RECOVER_ACCOUNT from '~/src/components/Docs/Api/Account/post/recoverAccount';
import * as DEL_DESTROY_ACCOUNT from '~/src/components/Docs/Api/Account/del/destroyAccount';
import * as POST_ACTIVE_ACCOUNT from '~/src/components/Docs/Api/Account/post/activeAccount';
import * as POST_CREATE_ACCOUNT from '~/src/components/Docs/Api/Account/post/createAccount';
import * as DEL_BLOCK_ACCOUNT from '~/src/components/Docs/Api/Account/del/blockAccount';
import * as PUT_UPDATE_ACCOUNT_AVATAR from '~/src/components/Docs/Api/Account/put/updateAccountAvatar';

export const key = 'account';
export const icon = 'key';
export const label = '账号';
export const items = genItems(
  GET_FETCH_ACCOUNT_LIST,
  GET_FETCH_ACCOUNT_PROFILE,
  POST_CREATE_ACCOUNT,
  POST_ACTIVE_ACCOUNT,
  POST_RECOVER_ACCOUNT,
  PUT_UPDATE_ACCOUNT,
  PUT_UPDATE_ACCOUNT_AVATAR,
  DEL_BLOCK_ACCOUNT,
  DEL_DESTROY_ACCOUNT
);
