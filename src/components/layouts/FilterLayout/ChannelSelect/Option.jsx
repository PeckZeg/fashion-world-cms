import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import toProcessImage from '@util/qiniu/toProcessImage';

import styles from './styles.css';

/**
 *  频道选择项
 *  @class
 */
export default class ChannelSelectOption extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    entry: PropTypes.object.isRequired
  };

  render() {
    const { entry } = this.props;
    const { cover, name } = entry;

    return (
      <div className={styles.option}>
        <Avatar
          size="small"
          icon="appstore-o"
          shape="square"
          src={toProcessImage(cover, { w: 64, h: 64 })}
        />
        <h4>
          {name}
        </h4>
      </div>
    );
  }
}
