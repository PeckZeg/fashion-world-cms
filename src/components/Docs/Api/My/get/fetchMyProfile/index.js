import React from 'react';

import genApiPath from '~/src/components/Docs/Api/My/genApiPath';
import request from './request.txt';
import response from './response.json';

export const type = '个人中心';
export const method = 'GET';
export const title = '获取我的资料';
export const desc = '用于获取当前登录账号的信息。';
export const pathname = genApiPath('');
export const action = 'admin:my:fetch-my-profile';
export const headers = [
  {
    key: 'Authorization',
    value: 'Caa {{signature}}',
    required: true,
    note: '接口签名'
  }
];
export const pathParams = [];
export const queryParams = [];
export const bodyParams = [];

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
    note: '账号信息'
  }
];

export const example = { request, response };
