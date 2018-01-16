import Highlighter from 'react-highlight-words';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import toProcessImage from '@util/qiniu/toProcessImage';

import styles from './styles.css';

export default class CategorySelectOption extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    entry: PropTypes.object.isRequired,
    searchName: PropTypes.string
  };

  render() {
    const { entry, searchName } = this.props;
    const { cover, name, channel } = entry;
    const { name: channelName } = channel;

    return (
      <div className={styles.option}>
        <Avatar
          size="small"
          icon="pushpin-o"
          shape="square"
          src={toProcessImage(cover, { w: 64, h: 64 })}
        />
        <h4>
          {searchName ? (
            <Highlighter
              textToHighlight={name}
              searchWords={[searchName]}
            />
          ) : name}
          <small>
            {channelName}
          </small>
        </h4>
      </div>
    );
  }
};
