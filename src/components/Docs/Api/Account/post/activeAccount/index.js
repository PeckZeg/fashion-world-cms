import React from 'react';

import genApiPath from '~/src/components/Docs/Api/Account/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '~/src/components/Docs/Api/Account';
export const method = 'POST';
export const title = '激活账号';
export const desc = '用于激活用户账号。';
export const pathname = genApiPath('/:accountId/active');
export const action = 'admin:account:active-account';
export const headers = [
  {
    key: 'Authorization',
    value: 'Caa {{signature}}',
    required: true,
    note: '接口签名'
  }
];

export const pathParams = [
  {
    required: true,
    param: 'accountId',
    type: 'ObjectId',
    note: '账号编号'
  }
];

export const queryParams = [];

export const bodyParams = [];

export const errorCodes = [
  {
    code: 400,
    message: 'invalid authorization',
    note: '签名验证失败'
  },
  {
    code: 403,
    message: 'account has been actived',
    note: '账号已被激活'
  },
  {
    code: 404,
    message: 'apiKey not found',
    note: '用户未登录'
  },
  {
    code: 500,
    note: '服务器错误'
  }
];

export const responseBody = [
  {
    key: 'account',
    type: 'object',
    note: '账号'
  }
];

export const example = { request, response };
