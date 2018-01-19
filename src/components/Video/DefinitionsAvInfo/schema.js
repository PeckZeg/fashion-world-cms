import filesize from 'filesize';
import moment from 'moment';

import decimalSeparator from '@util/decimalSeparator';
import formatDuration from '@util/formatDuration';

export const format = [
  {
    key: 'filename',
    label: '文件名'
  },
  {
    key: 'nb_streams',
    label: '流的数目'
  },
  {
    key: 'format_name',
    label: '格式名'
  },
  {
    key: 'format_long_name',
    label: '格式名全称'
  },
  {
    key: 'start_time',
    label: '首帧时间',
    format: startTime => formatDuration(moment.duration(+startTime, 's'))
  },
  {
    key: 'duration',
    label: '时长',
    format: duration => formatDuration(moment.duration(+duration, 's'))
  },
  {
    key: 'size',
    label: '文件大小',
    format: size => filesize(size)
  },
  {
    key: 'bit_rate',
    label: '码率',
    format: decimalSeparator
  },
  {
    key: 'tags.major_brand',
    label: '主品牌'
  },
  {
    key: 'tags.minor_version',
    label: '次要版本'
  },
  {
    key: 'tags.compatible_brands',
    label: '兼容性品牌'
  },
  {
    key: 'tags.creation_time',
    label: '创建时间'
  }
];

export const streams = [
  [
    {
      key: 'index',
      label: '流索引号'
    },
    {
      key: 'codec_name',
      label: '编码器名'
    },
    // {
    //   key: 'codec_long_name',
    //   label: '编码器名全称'
    // },
    {
      key: 'codec_type',
      label: '编码器类型'
    },
    {
      key: 'codec_time_base',
      label: '编码器每帧时长'
    },
    {
      key: 'codec_tag_string',
      label: '编码器标签名'
    },
    {
      key: 'codec_tag',
      label: '编码器标签'
    },
    {
      key: 'width',
      label: '宽度',
      format: decimalSeparator
    },
    {
      key: 'height',
      label: '高度',
      format: decimalSeparator
    },
    {
      key: 'has_b_frames',
      label: '记录帧缓存大小'
    },
    {
      key: 'sample_aspect_ratio',
      label: '采样率'
    },
    {
      key: 'display_aspect_ratio',
      label: '比率'
    },
    {
      key: 'pix_fmt',
      label: '像素个数'
    },
    {
      key: 'level',
      label: '级别'
    },
    {
      key: 'r_frame_rate',
      label: '真实基础帧率'
    },
    {
      key: 'avg_frame_rate',
      label: '平均帧率'
    },
    {
      key: 'time_base',
      label: '每帧时长'
    },
    {
      key: 'start_time',
      label: '首帧时间',
      format: startTime => formatDuration(moment.duration(+startTime, 's'))
    },
    {
      key: 'duration',
      label: '文件总时间',
      format: duration => formatDuration(moment.duration(+duration, 's'))
    },
    {
      key: 'nb_frames',
      label: '帧数',
      format: decimalSeparator
    },
    {
      key: 'tags.creation_time',
      label: '创建时间'
    },
    {
      key: 'tags.language',
      label: '语言'
    },
    {
      key: 'tags.handler_name',
      label: '处理器名字'
    }
  ],
  [
    {
      key: 'index',
      label: '流索引号'
    },
    {
      key: 'codec_name',
      label: '编码器名'
    },
    // {
    //   key: 'codec_long_name',
    //   label: '编码器名全称'
    // },
    {
      key: 'codec_type',
      label: '编码器类型'
    },
    {
      key: 'codec_time_base',
      label: '编码器每帧时长'
    },
    {
      key: 'codec_tag_string',
      label: '编码器标签名'
    },
    {
      key: 'codec_tag',
      label: '编码器标签'
    },
    {
      key: 'sample_fmt',
      label: '采样格式'
    },
    {
      key: 'sample_rate',
      label: '采样率',
      format: decimalSeparator
    },
    {
      key: 'channels',
      label: '音频数'
    },
    {
      key: 'bits_per_sample',
      label: '采样码率'
    },
    {
      key: 'r_frame_rate',
      label: '真实基础帧率'
    },
    {
      key: 'avg_frame_rate',
      label: '平均帧率'
    },
    {
      key: 'time_base',
      label: '每帧时长'
    },
    {
      key: 'start_time',
      label: '首帧时间',
      format: startTime => formatDuration(moment.duration(+startTime, 's'))
    },
    {
      key: 'duration',
      label: '文件总时间',
      format: duration => formatDuration(moment.duration(+duration, 's'))
    },
    {
      key: 'nb_frames',
      label: '帧数',
      format: decimalSeparator
    },
    {
      key: 'tags.creation_time',
      label: '创建时间'
    },
    {
      key: 'tags.language',
      label: '语言'
    },
    {
      key: 'tags.handler_name',
      label: '处理器名字'
    }
  ]
];
