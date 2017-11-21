import genItems from '~/src/components/Docs/const/siders/genItems';

import * as GET_FETCH_ACCOUNT_PROFILE from '~/src/components/Docs/Api/Account/get/fetchAccountProfile';
import * as GET_FETCH_ACCOUNT_LIST from '~/src/components/Docs/Api/Account/get/fetchAccountList';
import * as DEL_BLOCK_ACCOUNT from '~/src/components/Docs/Api/Account/del/blockAccount';

export const key = 'account';
export const icon = 'key';
export const label = '账号';
export const items = genItems(
  GET_FETCH_ACCOUNT_LIST,
  GET_FETCH_ACCOUNT_PROFILE,
  DEL_BLOCK_ACCOUNT
);
