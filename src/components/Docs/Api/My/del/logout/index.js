import React from 'react';

import genApiPath from '~/src/components/Docs/Api/My/genApiPath';
import request from './request.txt';
import response from './response.json';

export const type = '个人中心';
export const method = 'DEL';
export const title = '登出';
export const desc = '用于登出整个内容管理系统。';
export const pathname = genApiPath('/logout');
export const action = 'admin:my:logout';
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
    code: 500,
    note: '服务器错误'
  }
];

export const responseBody = [
  {
    key: 'message',
    type: 'string',
    note: (
      <span>
        始终返回 <code>"ok"</code>
      </span>
    )
  }
];

export const example = { request, response };
