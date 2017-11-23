import React from 'react';

import genApiPath from '@api-docs/Channel/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Channel';
export const method = 'POST';
export const title = '创建频道';
export const desc = '创建一个新频道';
export const pathname = genApiPath('/');
export const action = 'admin:channel:create-channel';
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
        频道名称，在 <code>1</code> ~ <code>64</code> 个字符之间
      </span>
    )
  },
  {
    param: 'priority',
    type: 'number',
    note: '排序值'
  },
  {
    param: 'publishAt',
    type: 'number',
    note: '发布的时间戳，如果该时间戳超出当前时间，则表示该频道将处于定时状态'
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
    code: 500,
    note: '服务器错误'
  }
];

export const responseBody = [
  {
    key: 'channel',
    type: 'object',
    note: '频道'
  }
];

export const example = { request, response };
