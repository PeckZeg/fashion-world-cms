import React, { PureComponent } from 'react';

import SyncButton from './SyncButton';

import styles from './styles.css';

export default class FilterLayout extends PureComponent {
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
