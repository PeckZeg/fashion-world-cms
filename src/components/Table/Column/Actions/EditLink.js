import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *  编辑按钮
 *  @class
 */
export default class EditLink extends PureComponent {
  /**
   *  `props` 类型检查
   *  @property {string|object} to 链接地址
   *  @property {boolean} disabled 禁止状态
   */
  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    disabled: PropTypes.bool
  };

  render() {
    const { disabled, to } = this.props;
    const children = this.props.children || '编辑';

    return disabled ? (
      <a className="disabled" href="javascript:;">
        {children}
      </a>
    ) : (
      <Link to={to}>
        {children}
      </Link>
    );
  }
};
