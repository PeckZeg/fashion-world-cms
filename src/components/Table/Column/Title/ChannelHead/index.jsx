import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import toProcessImage from '@util/qiniu/toProcessImage';

import styles from './styles.css';

/**
 *  频道分类显示
 *  @class
 */
export default class ChannelHead extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    categoryVisible: PropTypes.bool,
    entry: PropTypes.object
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    categoryVisible: true
  };

  render() {
    const { entry, categoryVisible } = this.props;
    const { channel, category } = entry;

    return (
      <div className={styles.head}>
        <Avatar
          shape="square"
          icon="appstore-o"
          size="small"
          src={toProcessImage(get(channel, 'cover'), { w: 64, h: 64 })}
        />
        {!isEmpty(channel) ? (
          <Link to={`/channel/${channel._id}`}>
            {channel.name}
          </Link>
        ) : '无'}
        {categoryVisible && (
          <Fragment>
            <span className={styles.next}>»</span>
            <Avatar
              shape="square"
              icon="pushpin-o"
              size="small"
              src={toProcessImage(get(category, 'cover'), { w: 64, h: 64 })}
            />
            {!isEmpty(category) ? (
              <Link to={`/category/${category._id}`}>
                {category.name}
              </Link>
            ) : '无'}
          </Fragment>
        )}
      </div>
    );
  }
};
