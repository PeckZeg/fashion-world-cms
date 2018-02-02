// import reduce from 'lodash/reduce';
import map from 'lodash/map';

export const types = [
  {
    key: 'URL',
    label: '跳转链接',
    icon: 'link'
  },
  {
    key: 'GOTO_VIDEO_PROFILE',
    label: '跳转视频详情',
    icon: 'video-camera'
  }
];

export const typeKeys = map(types, 'key');
