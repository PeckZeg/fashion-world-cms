import {
  ABOUT_GET_FETCH_ABOUT_LIST,
  ABOUT_GET_FETCH_ABOUT_PROFILE,
  ABOUT_POST_CREATE_ABOUT,
  ABOUT_POST_PUBLISH_ABOUT,
  ABOUT_POST_RECOVER_ABOUT,
  ABOUT_PUT_UPDATE_ABOUT,
  ABOUT_DEL_BLOCK_ABOUT,
  ABOUT_DEL_DESTROY_ABOUT
} from './about';
import { MY_POST_LOGIN } from './my';
import MD5 from 'crypto-js/md5';

import isPlainObject from 'lodash/isPlainObject';
import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';

describe('API - about', () => {
  let aboutId = '5a43631a8a76ff46907ce8a5';
  let token;

  beforeAll(async () => {
    token = await MY_POST_LOGIN('PeckZeg', MD5('ju789olk').toString());
  });

  it('[GET] fetch about list', async () => {
    const data = await ABOUT_GET_FETCH_ABOUT_LIST(token);

    expect(data).toHaveProperty('total');
    expect(isNumber(data.total)).toBeTruthy();

    expect(data).toHaveProperty('abouts');
    expect(isArray(data.abouts)).toBeTruthy();
  });

  it('[GET] fetch about profile', async () => {
    const data = await ABOUT_GET_FETCH_ABOUT_PROFILE(token, aboutId);

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });

  it('[POST] create about', async () => {
    const data = await ABOUT_POST_CREATE_ABOUT(token, {
      name: `Test - ${+new Date()}`,
      value: 'Test'
    });

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });

  it('[PUT] update about', async () => {
    const data = await ABOUT_PUT_UPDATE_ABOUT(token, aboutId, {
      value: `TEST - ${+new Date()}`
    });

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });

  it('[POST] publish about', async () => {
    const data = await ABOUT_POST_PUBLISH_ABOUT(token, aboutId);

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });

  it('[DEL] block about', async () => {
    const data = await ABOUT_DEL_BLOCK_ABOUT(token, aboutId);

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });

  it('[DEL] destroy about', async () => {
    const data = await ABOUT_DEL_DESTROY_ABOUT(token, aboutId);

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });

  it('[POST] recover about', async () => {
    const data = await ABOUT_POST_RECOVER_ABOUT(token, aboutId);

    expect(data).toHaveProperty('about');
    expect(isPlainObject(data.about)).toBeTruthy();
  });
});
