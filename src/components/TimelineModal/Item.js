import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tag, Timeline } from 'antd';
import moment from 'moment';

import isUndefined from 'lodash/isUndefined';

import styles from './styles.css';

export default class TimelineItem extends PureComponent {
  static propTypes = {
    createAt: PropTypes.oneOfType([
      PropTypes.instanceOf(moment.prototype.constructor),
      PropTypes.instanceOf(Date),
      PropTypes.number,
    ]),
    color: PropTypes.string,
    dot: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    complete: PropTypes.number,
    fail: PropTypes.number,
    ignore: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = { createAt: new Date() };
  }

  render() {
    const { color, dot, children, complete, fail, ignore } = this.props;
    const createAt = this.props.createAt || this.state.createAt;
    const showList = !isUndefined(complete) || !isUndefined(fail) ||
                     !isUndefined(ignore);

    return (
      <Timeline.Item className={styles.item} color={color} dot={dot}>
        <span className={styles.datetime}>
          {moment(createAt).format('YYYY-MM-DD HH:mm:ss')}
        </span>
        {showList ? '处理完毕！' : children}
        {showList && (
          <ul>
            {!isUndefined(complete) && (
              <li>
                <Tag color="cyan">完成</Tag>
                <code>{complete}</code>
              </li>
            )}
            {!isUndefined(fail) && (
              <li>
                <Tag color="red">失败</Tag>
                <code>{fail}</code>
              </li>
            )}
            {!isUndefined(ignore) && (
              <li>
                <Tag>忽略</Tag>
                <code>{ignore}</code>
              </li>
            )}
          </ul>
        )}
      </Timeline.Item>
    );
  }
}
