import Profile from '@components/Banner/Profile';
// import Create from '@components/Banner/Create';
import List from '@components/Banner/List';

export const key = 'banner';
export { banner as icon } from '@const/icons';
export const label = '横幅栏管理';
export const indexRoute = '/banners';
export const permission = 'VIEW_BANNER';
export const items = [
  {
    permission,
    key: '/banners',
    icon: 'bars',
    label: '所有横幅栏',
    component: List
  },
  {
    permission,
    key: '/published-banners',
    icon: 'check',
    label: '使用中的横幅栏',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-banners',
    icon: 'clock-circle-o',
    label: '计划中的横幅栏',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-banners',
    icon: 'pause',
    label: '未使用的横幅栏',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-banners',
    icon: 'delete',
    label: '已删除的横幅栏',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  // {
  //   permission: 'CREATE_BANNER',
  //   key: '/create-banner',
  //   icon: 'plus',
  //   label: '创建横幅栏',
  //   component: Create
  // },
  {
    permission,
    hidden: true,
    key: '/banner/:bannerId',
    label: '横幅栏信息',
    component: Profile
  }
];
