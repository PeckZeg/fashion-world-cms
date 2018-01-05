import React, { PureComponent } from 'react';
import { Tooltip, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './styles.css';

/**
 *  推荐栏
 *  @class
 */
export default class TableRecommendAtColumn extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    format: PropTypes.string
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    format: 'YYYY-MM-DD HH:mm'
  };

  render() {
    const { value, format } = this.props;
    let icon = 'like-o';
    let title = '未推荐';
    let color;

    if (value && moment(value).isValid()) {
      title = `推荐于 ${moment(value).format(format)}`;
      icon = 'like';
      color = 'blue';
    }

    return (
      <div className={styles.container}>
        <Tooltip title={title}>
          <Tag color={color}>
            <Icon type={icon} />
          </Tag>
        </Tooltip>
      </div>
    );
  }
};
