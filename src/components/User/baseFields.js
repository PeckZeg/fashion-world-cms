export const avatar = {
  label: '头像'
};

export const name = {
  label: '昵称',
  rules: [
    { required: true, message: '名称是必需的' },
    { min: 3, max: 24, message: '名称必需在 3 ~ 24 长度之间' }
  ]
};

export const gender = {
  label: '性别'
};
