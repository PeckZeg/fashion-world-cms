import Profile from '~/src/components/Channel/Profile';
import List from '~/src/components/Channel/List';

export const key = 'channel';
export const icon = 'appstore-o';
export const label = '频道管理';
export const indexRoute = '/channels';
export const items = [
  {
    key: '/channels',
    icon: 'bars',
    label: '所有频道',
    component: List
  },
  {
    key: '/published-channels',
    icon: 'check',
    label: '使用中的频道',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    key: '/timing-channels',
    icon: 'clock-circle-o',
    label: '计划中的频道',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    key: '/blocked-channels',
    icon: 'pause',
    label: '未使用的频道',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    key: '/removed-channels',
    icon: 'delete',
    label: '已删除的频道',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    hidden: true,
    key: '/channel/:channelId',
    label: '频道信息',
    component: Profile
  }
];
