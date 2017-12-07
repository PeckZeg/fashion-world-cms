import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import styles from './styles.css';

export default class CardLayout extends PureComponent {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    const { children, ...resetProps } = this.props;

    return (
      <Card
        className={styles.container}
        bordered={false}
        {...resetProps}
      >
        {children}
      </Card>
    );
  }
}
