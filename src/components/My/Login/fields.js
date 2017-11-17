const isDev = process.env.NODE_ENV === 'development';

export const name = [
  'name',
  {
    rules: [
      { required: true, message: '请输入用户名' }
    ],
    ...isDev ? { initialValue: 'PeckZeg' } : {}
  }
];

export const password = [
  'password',
  {
    rules: [
      { required: true, message: '请输入密码' }
    ],
    ...isDev ? { initialValue: 'ju789olk' } : {}
  }
];
