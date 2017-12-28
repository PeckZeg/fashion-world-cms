import Profile from '@components/About/Profile';
import List from '@components/About/List';

export const key = 'about';
export const icon = 'copyright';
export const label = '关于管理';
export const indexRoute = '/abouts';
export const permission = 'VIEW_ABOUT';
export const items = [
  {
    permission,
    key: '/abouts',
    icon: 'bars',
    label: '所有关于',
    component: List
  },
  {
    permission,
    key: '/actived-abouts',
    icon: 'check',
    label: '使用中的关于',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-abouts',
    icon: 'clock-circle-o',
    label: '计划中的关于',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-abouts',
    icon: 'pause',
    label: '未使用的关于',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-abouts',
    icon: 'delete',
    label: '已删除的关于',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/about/:aboutId',
    label: '关于信息',
    component: Profile
  }
];
