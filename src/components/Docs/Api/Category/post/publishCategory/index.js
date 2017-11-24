import React from 'react';

import genApiPath from '@api-docs/Category/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Category';
export const method = 'POST';
export const title = '发布分类';
export const desc = '发布频道分类。';
export const pathname = genApiPath('/:categoryId/publish');
export const action = 'admin:category:publish-category';
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
    param: 'categoryId',
    type: 'ObjectId',
    required: true,
    note: '分类编号'
  }
];

export const queryParams = [];

export const bodyParams = [
  {
    param: 'publishAt',
    type: 'Date',
    note: '发布时间'
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
    message: 'category has been published',
    note: '分类已经发布老~'
  },
  {
    code: 404,
    message: 'apiKey not found',
    note: '用户未登录'
  },
  {
    code: 404,
    message: 'category not found',
    note: '未找到分类'
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
