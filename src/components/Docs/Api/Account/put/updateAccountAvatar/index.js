import React from 'react';

import genApiPath from '~/src/components/Docs/Api/Account/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '~/src/components/Docs/Api/Account';
export const method = 'PUT';
export const title = '更新账号头像';
export const desc = '用于更新账号头像。';
export const pathname = genApiPath('/:accountId/avatar');
export const action = 'admin:account:update-account-avatar';
export const headers = [
  {
    key: 'Content-Type',
    value: 'application/json',
    required: true
  },
  {
    key: 'Authorization',
    value: 'Caa {{signature}}',
    required: true,
    note: '接口签名'
  }
];

export const pathParams = [
  {
    param: 'accountId',
    type: 'ObjectId',
    required: true,
    note: '账号编号'
  }
];

export const queryParams = [];

export const bodyParams = [
  {
    param: 'key',
    type: 'string',
    note: '存储在七牛存储空间上的键'
  }
];

export const errorCodes = [
  {
    code: 400,
    message: 'invalid authorization',
    note: '签名验证失败'
  },
  {
    code: 404,
    message: 'apiKey not found',
    note: '用户未登录'
  },
  {
    code: 404,
    message: 'account not found',
    note: '未找到账号'
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
