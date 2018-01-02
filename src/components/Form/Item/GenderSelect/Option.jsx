import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tag } from 'antd';

export default class GenderSelectOption extends PureComponent {

  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string
  };

  render() {
    const { label, color, icon } = this.props;

    return (
      <Fragment>
        {icon && (
          <Tag color={color}>
            <Icon type={icon} />
          </Tag>
        )}
        {label}
      </Fragment>
    );
  }
};
