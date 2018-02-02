import { typeKeys } from '@const/banner/types';
import URL_PATTERN from '@const/patterns/url';

export const channelId = {
  label: '频道',
  rules: [
    { required: true, message: '频道是必需的' }
  ]
};

export const categoryId = {
  label: '分类'
};

export const cover = {
  label: '封面'
};

export const type = {
  label: '跳转类型',
  rules: [
    { required: true, message: '跳转类型是必需的' },
    { type: 'enum', enum: typeKeys }
  ]
};

export const valueUrl = {
  field: 'value.url',
  label: '跳转链接',
  rules: [
    { required: true, message: '跳转链接是必需的' },
    { pattern: URL_PATTERN, message: '跳转链接格式错误' }
  ],
  inputProps: {
    placeholder: 'http://www.example.com'
  }
};

export const valueVideoId = {
  field: 'value.videoId',
  label: '跳转视频',
  rules: [
    { required: true, message: '跳转视频是必需的' }
  ]
};

export const title = {
  label: '标题',
  rules: [
    { required: true, message: '标题是必需的' },
    { min: 1, max: 64, message: '标题必需在 1 ~ 64 长度之间' }
  ]
};

export const description = {
  label: '简介',
  rules: [
    { max: 2048, message: '简介最长为 2048 个字符' }
  ],
  inputProps: {
    autosize: {
      minRows: 4,
      maxRows: 8
    }
  }
};

export const priority = {
  label: '排序值',
  inputProps: {
    style: {
      width: '100%'
    }
  }
};
