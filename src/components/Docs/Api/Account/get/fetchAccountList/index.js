import React from 'react';

import genApiPath from '~/src/components/Docs/Api/Account/genApiPath';
import request from './request.txt';
import response from './response.json';

export const type = '账号';
export const method = 'GET';
export const title = '获取账号列表';
export const desc = '用于获取账号列表或搜索账号。';
export const pathname = genApiPath('');
export const action = 'admin:account:fetch-account-list';
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
    param: 'accountId',
    type: 'ObjectId',
    note: '账号编号'
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
    param: 'sortActiveAt',
    type: 'number',
    note: (
      <span>
        基于 <code>activeAt</code> 进行排序，取值 <code>-1|1</code>
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
    key: 'total',
    type: 'number',
    note: '查询到的账号数量'
  },
  {
    key: 'accounts',
    type: 'object[]',
    note: '账号列表'
  }
];

export const example = { request, response };
