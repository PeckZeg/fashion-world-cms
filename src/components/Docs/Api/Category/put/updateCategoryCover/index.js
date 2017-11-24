import React from 'react';

import genApiPath from '@api-docs/Category/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Category';
export const method = 'PUT';
export const title = '修改分类封面';
export const desc = '修改频道分类的封面信息。';
export const pathname = genApiPath('/:categoryId/cover');
export const action = 'admin:category:update-category-cover';
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
    param: 'categoryId',
    type: 'ObjectId',
    note: '分类编号'
  }
];

export const queryParams = [];

export const bodyParams = [
  {
    param: 'key',
    type: 'string',
    required: true,
    note: '在七牛云存储上的键值'
  },
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
