import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

export default class Definition extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    exists: PropTypes.bool,
    label: PropTypes.string
  };

  render() {
    const { exists, label } = this.props;
    const color = exists ? 'blue' : void 0;

    return (
      <Tag color={color}>
        {label}
      </Tag>
    );
  }
}
