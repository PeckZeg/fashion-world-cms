import React from 'react';

import genApiPath from '~/src/components/Docs/Api/My/genApiPath';
import request from './request.txt';
import response from './response.json';

export const type = '个人中心';
export const method = 'PUT';
export const title = '更新我的信息';
export const desc = '用于修改当前登录账号的信息（除头像）。';
export const pathname = genApiPath('');
export const action = 'admin:my:update-my-profile';
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
    note: '用户名'
  },
  {
    param: 'password',
    type: 'string',
    note: '密码（MD5 加密，32 位小写）'
  }
];

export const errorCodes = [
  {
    code: 400,
    message: 'invalid authorization',
    note: '签名验证失败'
  },
  {
    code: 400,
    message: 'Path `{{prop}}` (`{{value}}`) is invalid',
    note: '无效的属性值'
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
    note: '账号信息'
  }
];

export const example = { request, response };
