import React from 'react';

import genApiPath from '~/src/components/Docs/Api/My/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '~/src/components/Docs/Api/My';
export const method = 'PUT';
export const title = '更新我的头像';
export const desc = '用于更新存储于七牛云上的头像。';
export const pathname = genApiPath('/avatar');
export const action = 'admin:my:update-my-avatar';
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
    param: 'key',
    type: 'string',
    note: '存储于七牛上的图片键'
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
    message: 'no such file or directory',
    note: '在七牛云中未找到文件'
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
