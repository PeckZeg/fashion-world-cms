import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CardLayout from '@components/layouts/CardLayout';
import DefinitionsAvInfo from './DefinitionsAvInfo';

/**
 *  视频元信息
 *  @class
 */
export default class Avinfo extends PureComponent {
  /**
   *  传递给 `props` 的类型检查
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
    return (
      <CardLayout>
        <DefinitionsAvInfo
          definitions={this.props.entry.definitions}
        />
      </CardLayout>
    );
  }
}
