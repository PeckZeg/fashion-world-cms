import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Col } from 'antd';

import isNil from 'lodash/isNil';

import responsive from './responsive';
import styles from './styles.css';

export default class DescListItem extends PureComponent {
  render() {
    const { label, column, className, flex, children, ...restProps } = this.props;

    return (
      <Col
        className={classnames(styles.item, className)}
        {...responsive[column]}
        {...restProps}
      >
        {!isNil(label) && <div className={styles.label}>{label}</div>}
        {!isNil(children) && (
          <div className={styles.detail}>
            {flex ? <div className={styles.flex}>{children}</div> : children}
          </div>
        )}
      </Col>
    );
  }
}
