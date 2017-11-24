import React from 'react';

import genApiPath from '@api-docs/Category/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '@api-docs/Category';
export const method = 'GET';
export const title = '获取分类列表';
export const desc = '获取频道分类列表页。';
export const pathname = genApiPath('');
export const action = 'admin:category:fetch-category-list';
export const headers = [
  {
    key: 'Authorization',
    value: 'Caa {{signature}}',
    required: true,
    note: '接口签名'
  }
];

export const pathParams = [];

export const queryParams = [
  {
    param: 'offset',
    type: 'number',
    default: 0,
    note: '页面偏移量（页码）'
  },
  {
    param: 'limit',
    type: 'number',
    default: 20,
    note: '每页限制'
  },
  {
    param: 'categoryId',
    type: 'ObjectId',
    note: '分类编号'
  },
  {
    param: 'channelId',
    type: 'ObjectId',
    note: '频道编号'
  },
  {
    param: 'searchName',
    type: 'string',
    note: (
      <span>
        基于 <code>name</code> 进行搜索，不超过 <code>16</code> 个字符
      </span>
    )
  },
  {
    param: 'publishAt',
    type: 'string',
    note: (
      <span>
        过滤发布时间，取值 <code>on|off|timing</code>
      </span>
    )
  },
  {
    param: 'removeAt',
    type: 'string',
    note: (
      <span>
        过滤删除时间，取值 <code>on|off</code>
      </span>
    )
  },
  {
    param: 'sortPriority',
    type: 'number',
    note: (
      <span>
        基于 <code>priority</code> 进行排序，取值 <code>-1|1</code>
      </span>
    )
  },
  {
    param: 'sortPublishAt',
    type: 'number',
    note: (
      <span>
        基于 <code>publishAt</code> 进行排序，取值 <code>-1|1</code>
      </span>
    )
  },
  {
    param: 'sortRemoveAt',
    type: 'number',
    note: (
      <span>
        基于 <code>removeAt</code> 进行排序，取值 <code>-1|1</code>
      </span>
    )
  }
];

export const bodyParams = [];

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
    key: 'categories',
    type: 'object[]',
    note: '分类列表'
  },
  {
    key: 'categories[].channel',
    type: 'object',
    note: '频道信息'
  }
];

export const example = { request, response };
