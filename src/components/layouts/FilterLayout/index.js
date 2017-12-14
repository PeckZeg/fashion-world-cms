import React, { PureComponent } from 'react';

import InputSearch from './InputSearch';
import SyncButton from './SyncButton';

import styles from './styles.css';

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

  render() {
    const { children } = this.props;

    return children && (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
