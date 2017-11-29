import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './styles.css';

export default class TableCreateAtColumn extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired
  };

  render() {
    const value = moment(this.props.value);
    let label = value.format('YYYY-MM-DD HH:mm');
    let fromNow = value.fromNow();

    if (!value.isValid()) {
      return (
        <div className={styles.container}>
          无效的日期
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <strong>
          {label}
        </strong>
        <small>
          {fromNow}
        </small>
      </div>
    );
  }
}
