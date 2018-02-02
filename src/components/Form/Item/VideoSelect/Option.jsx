import Highlighter from 'react-highlight-words';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import toProcessImage from '@util/qiniu/toProcessImage';

import styles from './styles.css';

/**
 *  视频选择项
 *  @class
 */
export default class VideoSelectOption extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    entry: PropTypes.object.isRequired,
    searchName: PropTypes.string
  };

  render() {
    const { entry, searchTitle } = this.props;
    const { cover, title } = entry;

    return (
      <div className={styles.option}>
        <Avatar
          size="small"
          icon="appstore-o"
          shape="square"
          src={toProcessImage(cover, { w: 64, h: 64 })}
        />
        <h4>
          {searchTitle ? (
            <Highlighter
              textToHighlight={title}
              searchWords={[title]}
            />
          ) : title}
        </h4>
      </div>
    );
  }
};
