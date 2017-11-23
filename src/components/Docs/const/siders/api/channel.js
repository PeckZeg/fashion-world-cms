import genItems from '@docs/const/siders/genItems';

import * as GET_FETCH_CHANNEL_PROFILE from '@api-docs/Channel/get/fetchChannelProfile';
import * as PUT_UPDATE_CHANNEL_COVER from '@api-docs/Channel/put/updateChannelAvatar';
import * as GET_FETCH_CHANNEL_LIST from '@api-docs/Channel/get/fetchChannelList';
import * as DEL_DESTROY_CHANNEL from '@api-docs/Channel/delete/destroyChannel';
import * as POST_PUBLISH_CHANNEL from '@api-docs/Channel/post/publishChannel';
import * as POST_RECOVER_CHANNEL from '@api-docs/Channel/post/recoverChannel';
import * as POST_CREATE_CHANNEL from '@api-docs/Channel/post/createChannel';
import * as DEL_BLOCK_CHANNEL from '@api-docs/Channel/delete/blockChannel';
import * as PUT_UPDATE_CHANNEL from '@api-docs/Channel/put/updateChannel';

export { key, icon, label } from '@api-docs/Channel';

export const items = genItems(
  GET_FETCH_CHANNEL_LIST,
  GET_FETCH_CHANNEL_PROFILE,
  POST_CREATE_CHANNEL,
  POST_PUBLISH_CHANNEL,
  POST_RECOVER_CHANNEL,
  PUT_UPDATE_CHANNEL,
  PUT_UPDATE_CHANNEL_COVER,
  DEL_BLOCK_CHANNEL,
  DEL_DESTROY_CHANNEL
);
