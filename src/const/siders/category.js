import Profile from '~/src/components/Category/Profile';
import List from '~/src/components/Category/List';

export const key = 'category';
export const icon = 'pushpin-o';
export const label = '分类管理';
export const indexRoute = '/categories';
export const permission = 'VIEW_CATEGORY';
export const items = [
  {
    permission,
    key: '/categories',
    icon: 'bars',
    label: '所有分类',
    component: List
  },
  {
    permission,
    key: '/published-categories',
    icon: 'check',
    label: '使用中的分类',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-categories',
    icon: 'clock-circle-o',
    label: '计划中的分类',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-categories',
    icon: 'pause',
    label: '未使用的分类',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-categories',
    icon: 'delete',
    label: '已删除的分类',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/category/:categoryId',
    label: '分类信息',
    component: Profile
  }
];
