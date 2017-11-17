import { MY_POST_LOGIN } from '~/src/api/my';

export function login(name, password) {
  return MY_POST_LOGIN(name, password);
};
