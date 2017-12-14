export const channelId = {
  label: '频道'
};

export const cover = {
  label: '封面'
};

export const name = {
  label: '名称',
  rules: [
    { required: true, message: '名称是必需的' },
    { min: 1, max: 64, message: '名称必需在 1 ~ 64 长度之间' }
  ]
};

export const priority = {
  label: '排序值',
  inputProps: {
    style: {
      width: '100%'
    }
  }
};
