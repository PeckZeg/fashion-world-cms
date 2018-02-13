import VERSION_PATTERN from '@const/patterns/version';
import URL_PATTERN from '@const/patterns/url';

export const cover = {
  label: '封面'
};

export const type = {
  label: '更新平台',
  rules: [
    { required: true, message: '更新平台是必需的' }
  ]
};

export const title = {
  label: '标题',
  rules: [
    { required: true, message: '标题是必需的' },
    { min: 1, max: 32, message: '标题必需在 1 ~ 32 长度之间' }
  ]
};

export const description = {
  label: '简介',
  rules: [
    { max: 1024, message: '简介最长为 1024 个字符' }
  ],
  inputProps: {
    autosize: {
      minRows: 4,
      maxRows: 8
    }
  }
};

export const link = {
  label: '链接',
  rules: [
    { required: true, message: '跳转链接是必需的' },
    { pattern: URL_PATTERN, message: '跳转链接格式错误' }
  ],
  inputProps: {
    placeholder: 'http://www.example.com'
  }
};

export const version = {
  label: '更新版本',
  rules: [
    { required: true, message: '更新版本是必需的' },
    { pattern: VERSION_PATTERN, message: '更新版本格式错误' }
  ],
  inputProps: {
    placeholder: '2.1.3'
  }
};
