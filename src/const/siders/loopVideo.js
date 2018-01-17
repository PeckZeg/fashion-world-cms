import Profile from '@components/LoopVideo/Profile';
import List from '@components/LoopVideo/List';

export const key = 'loopVideo';
export { loopVideo as icon } from '@const/icons';
export const label = '循环视频管理';
export const indexRoute = '/loop-videos';
export const permission = 'VIEW_LOOP_VIDEO';
export const items = [
  {
    permission,
    key: '/loop-videos',
    icon: 'bars',
    label: '所有循环视频',
    component: List
  },
  {
    permission,
    key: '/published-loop-videos',
    icon: 'check',
    label: '使用中的循环视频',
    component: List,
    baseQuery: { publishAt: 'on', removeAt: 'off' }
  },
  {
    permission,
    key: '/timing-loop-videos',
    icon: 'clock-circle-o',
    label: '计划中的循环视频',
    component: List,
    baseQuery: { publishAt: 'timing', removeAt: 'off' }
  },
  {
    permission,
    key: '/blocked-loop-videos',
    icon: 'pause',
    label: '未使用的循环视频',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'off' }
  },
  {
    permission,
    key: '/removed-loop-videos',
    icon: 'delete',
    label: '已删除的循环视频',
    component: List,
    baseQuery: { publishAt: 'off', removeAt: 'on' }
  },
  {
    permission,
    hidden: true,
    key: '/loop-video/:loopVideoId',
    label: '循环视频信息',
    component: Profile
  }
];
