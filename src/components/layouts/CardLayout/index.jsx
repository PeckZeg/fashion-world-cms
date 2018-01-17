import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import HeaderInfo from './HeaderInfo';
import VideoInfo from './VideoInfo';

import styles from './styles.css';

/**
 *  卡片布局
 *  @class
 */
export default class CardLayout extends PureComponent {
  /**
   *  头部信息
   *  @static
   */
  static HeaderInfo = HeaderInfo;

  /**
   *  视频信息
   *  @static
   */
  static VideoInfo = VideoInfo;

  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    title: PropTypes.string,
    margin: PropTypes.oneOf(['top', 'bottom']),
    bordered: PropTypes.bool
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    bordered: false
  };

  render() {
    const { children, margin, bordered, ...resetProps } = this.props;

    return (
      <Card
        className={classnames(
          styles.container,
          { [`margin-${margin}`]: margin }
        )}
        bordered={bordered}
        {...resetProps}
      >
        {children}
      </Card>
    );
  }
}
