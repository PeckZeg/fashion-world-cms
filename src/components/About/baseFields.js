export const name = {
  label: '名称',
  rules: [
    { required: true, message: '名称是必需的' },
    { min: 1, max: 32, message: '名称必需在 1 ~ 32 长度之间' }
  ]
};

export const value = {
  label: '值',
  rules: [
    { required: true, message: '值是必需的' },
    { max: 512, message: '值最大长度为 512' }
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
