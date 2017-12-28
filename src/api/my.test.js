import {
  MY_GET_FETCH_MY_PROFILE,
  MY_POST_LOGIN,
  MY_DEL_LOGOUT
} from './my';
import MD5 from 'crypto-js/md5';

describe('API - my', () => {
  let token;

  it('[POST] login', async () => {
    const name = 'PeckZeg';
    const password = MD5('ju789olk').toString();
    token = await MY_POST_LOGIN(name, password);

    expect(token).toHaveProperty('apiKey');
    expect(token).toHaveProperty('secretKey');
    expect(token).toHaveProperty('accountId');
    expect(token).toHaveProperty('expireIn');
    expect(token).toHaveProperty('account');
  });

  it('[GET] fetch my profile', async () => {
    const data = await MY_GET_FETCH_MY_PROFILE(token);

    expect(data).toHaveProperty('account');
  });

  it('[DEL] logout', async () => {
    const data = await MY_DEL_LOGOUT(token);

    expect(data).toHaveProperty('message', 'ok');
  });
});
