import Profile from '~/src/components/Account/Profile';
import List from '~/src/components/Account/List';

export const key = 'account';
export const icon = 'key';
export const label = '账号管理';
export const indexRoute = '/accounts';
export const permission = 'VIEW_ACCOUNT';
export const items = [
  {
    permission,
    key: '/accounts',
    icon: 'bars',
    label: '所有账号',
    component: List
  },
  {
    permission,
    key: '/actived-accounts',
    icon: 'check',
    label: '使用中的账号',
    component: List,
    baseQuery: { activeAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-accounts',
    icon: 'pause',
    label: '未使用的账号',
    component: List,
    baseQuery: { activeAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-accounts',
    icon: 'delete',
    label: '已删除的账号',
    component: List,
    baseQuery: { activeAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/account/:accountId',
    label: '账号信息',
    component: Profile
  }
];
