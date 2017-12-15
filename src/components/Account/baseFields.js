export const name = {
  label: '登录名',
  rules: [
    { required: true, message: '登录名是必需的' },
    { min: 3, max: 32, message: '登录名必需在 3 ~ 32 长度之间' }
  ]
};

export const password = {
  label: '密码',
  rules: [
    { max: 32, message: '密码最长 32 位' }
  ],
  inputProps: {
    type: 'password'
  }
};

export const permissions = {
  label: '权限'
};

export const avatar = {
  label: '头像'
};
