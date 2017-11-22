import React from 'react';

import genApiPath from '~/src/components/Docs/Api/Account/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '~/src/components/Docs/Api/Account';
export const method = 'PUT';
export const title = '更新账号';
export const desc = '用于更新账号信息。';
export const pathname = genApiPath('/:accountId');
export const action = 'admin:account:update-account';
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
    param: 'name',
    type: 'string',
    note: (
      <span>
        登录名，在 <code>3</code> ~ <code>15</code> 个字符之间
      </span>
    )
  },
  {
    param: 'password',
    type: 'string',
    note: '密码（MD5 加密，32 位小写）'
  },
  {
    param: 'permissions',
    type: 'string[]',
    note: '权限列表，需全量提交'
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
