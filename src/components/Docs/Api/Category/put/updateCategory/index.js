import React from 'react';

import genApiPath from '@api-docs/Category/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Category';
export const method = 'PUT';
export const title = '更新分类';
export const desc = '封信频道分类信息。';
export const pathname = genApiPath('/:categoryId');
export const action = 'admin:category:update-category';
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
    param: 'channelId',
    type: 'ObjectId',
    note: '频道编号'
  },
  {
    param: 'name',
    type: 'string',
    note: (
      <span>
        分类名称，在 <code>1</code> ~ <code>64</code> 个字符之间
      </span>
    )
  },
  {
    param: 'priority',
    type: 'number',
    note: '排序值'
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
    key: 'category',
    type: 'object',
    note: '分类'
  },
  {
    key: 'category.channel',
    type: 'object',
    note: '频道'
  }
];

export const example = { request, response };
