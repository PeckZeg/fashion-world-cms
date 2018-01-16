import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import styles from './styles.css';

/**
 *  选择框旋转项
 *  @class
 */
export default class SelectSpinOption extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    label: PropTypes.node
  };

  /**
   *  `props` 默认值
   */
  static defaultProps = {
    label: '加载中...'
  };

  render() {
    const { label } = this.props;

    return (
      <div className={styles.container}>
        <Spin size="small" />
        {label}
      </div>
    );
  }
}
