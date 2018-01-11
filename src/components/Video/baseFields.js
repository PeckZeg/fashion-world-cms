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
  ]
};

export const summary = {
  label: '简介',
  rules: [
    { max: 65535, message: '简介最长为 65535 个字符' }
  ]
};

export const originalTitle = {
  label: '源标题',
  rules: [
    { max: 65535, message: '简介最长为 65535 个字符' }
  ]
};

export const rightsOwner = {
  label: '版权',
  rules: [
    { max: 65535, message: '简介最长为 65535 个字符' }
  ]
};

export const productionCountry = {
  label: '产地',
  rules: [
    { max: 65535, message: '简介最长为 65535 个字符' }
  ]
};

export const originalLanguage = {
  label: '源语言',
  rules: [
    { max: 65535, message: '简介最长为 65535 个字符' }
  ]
};

export const views = {
  label: '浏览数',
  rules: [
    { required: true, message: '浏览数是必需的' }
  ],
  inputProps: {
    style: {
      width: '100%'
    }
  }
};

export const subtitleFiles = {
  label: '字幕文件'
};

export const priority = {
  label: '排序值',
  inputProps: {
    style: {
      width: '100%'
    }
  }
};
