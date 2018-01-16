import Profile from '~/src/components/Channel/Profile';
import List from '~/src/components/Channel/List';

export const key = 'channel';
export { channel as icon } from '@const/icons';
export const label = '频道管理';
export const indexRoute = '/channels';
export const permission = 'VIEW_CHANNEL';
export const items = [
  {
    permission,
    key: '/channels',
    icon: 'bars',
    label: '所有频道',
    component: List
  },
  {
    permission,
    key: '/published-channels',
    icon: 'check',
    label: '使用中的频道',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-channels',
    icon: 'clock-circle-o',
    label: '计划中的频道',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-channels',
    icon: 'pause',
    label: '未使用的频道',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-channels',
    icon: 'delete',
    label: '已删除的频道',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/channel/:channelId',
    label: '频道信息',
    component: Profile
  }
];
