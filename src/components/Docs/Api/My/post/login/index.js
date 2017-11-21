import React from 'react';

import genApiPath from '~/src/components/Docs/Api/My/genApiPath';
import request from './request.txt';
import response from './response.json';

export const type = '个人中心';
export const method = 'POST';
export const title = '登录';
export const desc = '用于整个内容管理系统的用户登录。';
export const pathname = genApiPath('/login');
export const headers = [
  {
    key: 'Content-Type',
    value: 'application/json',
    required: true
  }
];
export const pathParams = [];
export const queryParams = [];
export const bodyParams = [
  {
    param: 'name',
    required: true,
    type: 'string',
    note: '用户名'
  },
  {
    param: 'password',
    required: true,
    type: 'string',
    note: '密码（MD5 加密，32 位小写）'
  }
];

export const errorCodes = [
  {
    code: 400,
    message: 'Path `{{prop}}` is required',
    note: (
      <span>
        属性 <code>{`{{code}}`}</code> 是必填滴
      </span>
    )
  },
  {
    code: 400,
    message: 'invalid name or password',
    note: '登录名或密码错误'
  },
  {
    code: 500,
    note: '服务器错误'
  }
];

export const responseBody = [
  {
    key: 'apiKey',
    type: 'string',
  },
  {
    key: 'secretKey',
    type: 'string'
  },
  {
    key: 'accountId',
    type: 'ObjectId',
    note: '账号编号'
  },
  {
    key: 'expireIn',
    type: 'number',
    note: '有效时间（在该时间戳之前均有效）'
  },
  {
    key: 'account',
    type: 'object',
    note: '账号信息'
  }
];

export const example = { request, response };
