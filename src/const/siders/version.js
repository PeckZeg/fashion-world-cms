import Profile from '@components/Version/Profile';
import List from '@components/Version/List';

export const key = 'version';
export { version as icon } from '@const/icons';
export const label = '版本管理';
export const indexRoute = '/versions';
export const permission = 'VIEW_VERSION';
export const items = [
  {
    permission,
    key: '/versions',
    icon: 'bars',
    label: '所有版本',
    component: List
  },
  {
    permission,
    key: '/published-versions',
    icon: 'check',
    label: '使用中的版本',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-versions',
    icon: 'clock-circle-o',
    label: '计划中的版本',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-versions',
    icon: 'pause',
    label: '未使用的版本',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-versions',
    icon: 'delete',
    label: '已删除的版本',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/version/:versionId',
    label: '版本信息',
    component: Profile
  }
];
