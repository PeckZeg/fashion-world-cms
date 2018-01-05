import Profile from '@components/Video/Profile';
import List from '@components/Video/List';

export const key = 'video';
export const icon = 'video-camera';
export const label = '视频管理';
export const indexRoute = '/videos';
export const permission = 'VIEW_VIDEO';
export const items = [
  {
    permission,
    key: '/videos',
    icon: 'bars',
    label: '所有视频',
    component: List
  },
  {
    permission,
    key: '/published-videos',
    icon: 'check',
    label: '使用中的视频',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-videos',
    icon: 'clock-circle-o',
    label: '计划中的视频',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/recommend-videos',
    icon: 'like',
    label: '推荐中的视频',
    component: List,
    baseQuery: { publishAt: 'on', recommendAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-recommend-videos',
    icon: 'clock-circle-o',
    label: '计划推荐的视频',
    component: List,
    baseQuery: { publishAt: 'on', recommendAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-videos',
    icon: 'pause',
    label: '未使用的视频',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-videos',
    icon: 'delete',
    label: '已删除的视频',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/video/:videoId',
    label: '视频信息',
    component: Profile
  }
];
