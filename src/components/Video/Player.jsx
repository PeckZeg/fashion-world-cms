import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '@components/VideoPlayer';

/**
 *  播放器
 *  @class
 */
export default class Player extends PureComponent {
  /**
   *  `props` 的类型检查
   *  @static
   *  @property {object} entry
   *  @property {entryProp} 条目属性
   *  @property {entryTitle} 条目名称
   *  @property {entryNameProp} 条目标题属性
   *  @property {Function} onUpdate function (newEntry) {}
   */
  static propTypes = {
    entry: PropTypes.object,
    entryProp: PropTypes.string,
    entryTitle: PropTypes.string,
    entryNameProp: PropTypes.string,
    onUpdate: PropTypes.func
  };

  render() {
    const { entry } = this.props;
    const { definitions } = entry;

    return (
      <VideoPlayer
        url={definitions[0].url}
      />
    );
  }
}
