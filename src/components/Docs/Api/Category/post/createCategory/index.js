import React from 'react';

import genApiPath from '@api-docs/Category/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Category';
export const method = 'POST';
export const title = '创建分类';
export const desc = '创建频道分类。';
export const pathname = genApiPath('');
export const action = 'admin:category:create-category';
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
    required: true,
    note: '频道编号'
  },
  {
    param: 'name',
    type: 'string',
    required: true,
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
  },
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
    code: 400,
    message: 'Path `{{prop}}` is required.',
    note: (
      <span>
        属性 <code>prop</code> 是必填滴
      </span>
    )
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
