import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Icon, Row } from 'antd';

import Channel from './Channel';
import Item from './Item';

import styles from './styles.css';

/**
 *  描述列表
 *  @class
 */
export default class DescList extends PureComponent {
  /**
   *  频道描述列表
   *  @static
   */
  static Channel = Channel;

  /**
   *  描述列表项
   *  @static
   */
  static Item = Item;

  /**
   *  `props` 类型检查
   *  @property {string} className
   *  @property {number} [gutter = 32]
   *  @property {number} [col = 3]
   *  @property {string} icon
   *  @property {string|ReactNode} title
   */
  static propTypes = {
    className: PropTypes.string,
    gutter: PropTypes.number,
    col: PropTypes.number,
    icon: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  };

  /**
   *  `props` 默认值
   */
  static defaultProps = {
    gutter: 32,
    col: 3
  };

  render() {
    const {
      className, gutter, col, icon, title, children, ...restProps
    } = this.props;

    const column = col > 4 ? 4 : col;

    return (
      <div className={classnames(styles.desc, className)} {...restProps}>
        {title && (
          <div className={styles.title}>
            {icon && (<Icon type={icon} />)}
            {title}
          </div>
        )}

        <Row gutter={gutter}>
          {Children.map(children, child => cloneElement(child, { column }))}
        </Row>
      </div>
    );
  }
}
