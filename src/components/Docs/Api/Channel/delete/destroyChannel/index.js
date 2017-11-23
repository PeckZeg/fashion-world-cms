import React from 'react';

import genApiPath from '@api-docs/Channel/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Channel';
export const method = 'DEL';
export const title = '删除频道';
export const desc = '软删除频道，使其不能够再使用。';
export const pathname = genApiPath('/:channelId');
export const action = 'admin:channel:destroy-channel';
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
    param: 'channelId',
    type: 'ObjectId',
    note: '频道编号'
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
    message: 'channel has been removed',
    note: '频道已经被删除'
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
