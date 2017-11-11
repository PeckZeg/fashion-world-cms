import * as types from '~/src/actionTypes';

export const setMyToken = token => ({ type: types.MY_TOKEN, token });
export const setMyProfile = profile => ({ type: types.MY_PROFILE, profile });
