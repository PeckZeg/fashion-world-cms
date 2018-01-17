export const cover = {
  label: '封面'
};

export const videoId = {
  label: '视频',
  rules: [
    { required: true, message: '视频是必需的' }
  ]
};

export const title = {
  label: '标题',
  rules: [
    { required: true, message: '标题是必需的' },
    { min: 1, max: 64, message: '标题必需在 1 ~ 64 长度之间' }
  ]
};

export const subtitle = {
  label: '副标题',
  rules: [
    { max: 65535, message: '副标题最长为 65535 个字符' }
  ]
};

export const abstract = {
  label: '摘要',
  rules: [
    { max: 65535, message: '摘要最长为 65535 个字符' }
  ],
  inputProps: {
    autosize: { minRows: 4, maxRows: 12 }
  }
};

export const summary = {
  label: '简介',
  rules: [
    { max: 65535, message: '简介最长为 65535 个字符' }
  ],
  inputProps: {
    autosize: { minRows: 4, maxRows: 12 }
  }
};
