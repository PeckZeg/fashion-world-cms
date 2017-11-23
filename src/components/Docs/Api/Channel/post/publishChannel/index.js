import React from 'react';

import genApiPath from '@api-docs/Channel/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Channel';
export const method = 'POST';
export const title = '发布频道';
export const desc = '使频道处于发布状态';
export const pathname = genApiPath('/:channelId/publish');
export const action = 'admin:channel:publish-channel';
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
    required: true,
    param: 'channelId',
    type: 'ObjectId',
    note: '频道编号'
  }
];

export const queryParams = [];

export const bodyParams = [
  {
    param: 'publishAt',
    type: 'Date',
    note: '发布该频道的时间戳，当该时间戳超出当前时间时，该频道将处于定时状态'
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
    message: 'channel has been published',
    note: '频道已经发布'
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
