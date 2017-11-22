import React from 'react';

import genApiPath from '~/src/components/Docs/Api/Qiniu/genApiPath';
import request from './request.txt';
import response from './response.json';

export { label } from '~/src/components/Docs/Api/My';
export const method = 'GET';
export const title = '生成七牛上传令牌';
export const desc = '于上传七牛时使用。';
export const pathname = genApiPath('/upload-token');
export const action = 'admin:qiniu:get:generate-upload-token';
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
    param: 'filename',
    type: 'string',
    note: '文件名'
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
    code: 500,
    note: '服务器错误'
  }
];

export const responseBody = [
  {
    key: 'host',
    type: 'string',
    note: '主机地址'
  },
  {
    key: 'bucket',
    type: 'string',
    note: '上传的存储空间'
  },
  {
    key: 'key',
    type: 'string',
    note: '上传在存储空间的键'
  },
  {
    key: 'uploadToken',
    type: 'string',
    note: '上传令牌'
  }
];

export const example = { request, response };
