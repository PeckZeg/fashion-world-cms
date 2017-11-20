import { MY_POST_LOGIN, MY_DEL_LOGOUT } from '~/src/api/my';

export function login(name, password) {
  return MY_POST_LOGIN(name, password);
};

export function logout() {
  return MY_DEL_LOGOUT(this.token());
}
