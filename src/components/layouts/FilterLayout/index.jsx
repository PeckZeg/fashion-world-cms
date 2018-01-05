import React, { PureComponent } from 'react';

import ChannelSelect from './ChannelSelect';
import GenderSelect from './GenderSelect';
import InputSearch from './InputSearch';
import SyncButton from './SyncButton';

import styles from './styles.css';

/**
 *  过滤器视图
 *  @class
 */
export default class FilterLayout extends PureComponent {
  /**
   *  搜索框
   *  @static
   */
  static InputSearch = InputSearch;

  /**
   *  同步按钮
   *  @static
   */
  static SyncButton = SyncButton;

  /**
   *  性别选择器
   *  @static
   */
  static GenderSelect = GenderSelect;

  /**
   *  频道选择器
   *  @static
   */
  static ChannelSelect = ChannelSelect;

  render() {
    const { children } = this.props;

    return children && (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
