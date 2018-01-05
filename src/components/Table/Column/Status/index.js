import React, { PureComponent } from 'react';
import { Tooltip, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './styles.css';

export default class TableStatusColumn extends PureComponent {
  static propTypes = {
    publishAt: PropTypes.number,
    removeAt: PropTypes.number,
    format: PropTypes.string
  };

  render() {
    let { publishAt, removeAt, format = 'YYYY-MM-DD HH:mm' } = this.props;
    let icon = 'pause';
    let title = '未使用'
    let color;

    if (removeAt) {
      title = `删除于 ${moment(removeAt).format(format)}`;
      color = 'pink';
      icon = 'delete';
    }

    else if (publishAt) {
      const now = +moment();
      publishAt = moment(publishAt);

      if (publishAt.isBefore(now)) {
        title = `发布于 ${publishAt.format(format)}`;
        color = 'cyan';
        icon = 'check';
      }

      else {
        title = `将发布于 ${publishAt.format(format)}`;
        color = 'orange';
        icon = 'clock-circle-o';
      }
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
}
