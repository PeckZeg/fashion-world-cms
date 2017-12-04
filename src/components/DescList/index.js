import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import { Row } from 'antd';

import Item from './Item';

import styles from './styles.css';

export default class DescList extends PureComponent {
  static Item = Item;

  render() {
    const {
      className,
      gutter = 32,
      col = 3,
      title,
      children,
      ...restProps
    } = this.props;

    const column = col > 4 ? 4 : col;

    return (
      <div className={classnames(styles.desc, className)} {...restProps}>
        {title ? <div className={styles.title}>{title}</div> : null}
        <Row gutter={gutter}>
          {Children.map(children, child => cloneElement(child, { column }))}
        </Row>
      </div>
    );
  }
}
