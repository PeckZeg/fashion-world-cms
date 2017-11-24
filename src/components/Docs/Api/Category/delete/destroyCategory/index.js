import React from 'react';

import genApiPath from '@api-docs/Category/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Category';
export const method = 'DEL';
export const title = '删除分类';
export const desc = '软删除分类。';
export const pathname = genApiPath('/:categoryId');
export const action = 'admin:category:destroy-category';
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
    param: 'categoryId',
    type: 'ObjectId',
    note: '分类编号'
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
    message: 'category has been removed',
    note: '分类已经被删除'
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
