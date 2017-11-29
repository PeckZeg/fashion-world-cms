import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './styles.css';

export default class EntryTable extends PureComponent {
  render() {
    return (
      <Table
        className={styles.table}
        {...this.props}
      />
    );
  }
}
