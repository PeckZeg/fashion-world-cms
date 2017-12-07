export const name = {
  label: '登录名',
  rules: [
    { required: true, message: '登录名是必需的' },
    { min: 3, max: 32, message: '登录名必需在 3 ~ 32 长度之间' }
  ]
};

export const permissions = {
  label: '权限'
};
