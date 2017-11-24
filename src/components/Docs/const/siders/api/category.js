import genItems from '@docs/const/siders/genItems';

import * as GET_FETCH_CATEGORY_PROFILE from '@api-docs/Category/get/fetchCategoryProfile';
import * as PUT_UPDATE_CATEGORY_COVER from '@api-docs/Category/put/updateCategoryCover';
import * as GET_FETCH_CATEGORY_LIST from '@api-docs/Category/get/fetchCategoryList';
import * as DEL_DESTROY_CATEGORY from '@api-docs/Category/delete/destroyCategory';
import * as POST_PUBLISH_CATEGORY from '@api-docs/Category/post/publishCategory';
import * as POST_RECOVER_CATEGORY from '@api-docs/Category/post/recoverCategory';
import * as POST_CREATE_CATEGORY from '@api-docs/Category/post/createCategory';
import * as DEL_BLOCK_CATEGORY from '@api-docs/Category/delete/blockCategory';
import * as PUT_UPDATE_CATEGORY from '@api-docs/Category/put/updateCategory';

export { key, icon, label } from '@api-docs/Category';

export const items = genItems(
  GET_FETCH_CATEGORY_LIST,
  GET_FETCH_CATEGORY_PROFILE,
  POST_CREATE_CATEGORY,
  POST_PUBLISH_CATEGORY,
  POST_RECOVER_CATEGORY,
  PUT_UPDATE_CATEGORY,
  PUT_UPDATE_CATEGORY_COVER,
  DEL_BLOCK_CATEGORY,
  DEL_DESTROY_CATEGORY
);
