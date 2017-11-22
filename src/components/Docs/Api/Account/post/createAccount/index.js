import React from 'react';

import genApiPath from '~/src/components/Docs/Api/Account/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '~/src/components/Docs/Api/Account';
export const method = 'POST';
export const title = '创建账号';
export const desc = '用于创建后台账号。';
export const pathname = genApiPath('');
export const action = 'admin:account:create-account';
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

export const pathParams = [];

export const queryParams = [];

export const bodyParams = [
  {
    param: 'name',
    type: 'string',
    required: true,
    note: (
      <span>
        登录名，在 <code>3</code> ~ <code>15</code> 个字符之间
      </span>
    )
  },
  {
    param: 'password',
    type: 'string',
    required: true,
    note: '密码（MD5 加密，32 位小写）'
  },
  {
    param: 'permissions',
    type: 'string[]',
    default: '[]',
    note: '权限列表'
  }
];

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
