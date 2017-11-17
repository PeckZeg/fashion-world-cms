import List from '~/src/components/Account/List';

export const key = 'account';
export const icon = 'key';
export const label = '账号管理';
export const items = [
  {
    key: '/accounts',
    icon: 'bars',
    label: '所有账号',
    component: List
  },
  {
    key: '/actived-accounts',
    icon: 'check',
    label: '使用中的账号',
    component: List,
    baseQuery: { isActive: true, isRemoved: false }
  },
  {
    key: '/blocked-accounts',
    icon: 'pause',
    label: '未使用的账号',
    component: List,
    baseQuery: { isActive: false, isRemoved: false }
  },
  {
    key: '/removed-accounts',
    icon: 'delete',
    label: '已删除的账号',
    component: List,
    baseQuery: { isActive: false, isRemoved: true }
  },
];
