import Profile from '@components/User/Profile';
import List from '@components/User/List';

export const key = 'user';
export { user as icon } from '@const/icons';
export const label = '用户管理';
export const indexRoute = '/users';
export const permission = 'VIEW_USER';
export const items = [
  {
    permission,
    key: '/users',
    icon: 'bars',
    label: '所有用户',
    component: List
  },
  {
    permission,
    hidden: true,
    key: '/user/:userId',
    label: '用户信息',
    component: Profile
  }
];
