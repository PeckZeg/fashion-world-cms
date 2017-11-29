import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import isFunction from 'lodash/isFunction';

/**
 *  状态切换动作
 *  @class
 */
export default class SwitchAction extends PureComponent {

  /**
   *  传递给 `props` 的默认值
   *  @static
   *  @property {string} yesType
   *  @property {string} noType
   */
  static defaultProps = {
    yesType: 'default',
    noType: 'danger'
  };

  /**
   *  `props` 属性类型
   *  @static
   *  @property {boolean} status 显示状态
   *  @property {string} yesType `status=true` 时 `<Button />` 的 `type` 值
   *  @property {string} yesIcon `status=true` 时 `<Button />` 的 `icon` 值
   *  @property {string|React.Component} yesLabel `status=true` 时 `<Button />`
   *                                              显示的文本
   *  @property {Function} onYesClick `status=true` 时 `<Button />` `onClick`
   *  @property {string} noType `status=false` 时 `<Button />` 的 `type` 值
   *  @property {string} noIcon `status=false` 时 `<Button />` 的 `icon` 值
   *  @property {string|React.Component} noLabel `status=false` 时 `<Button />`
   *                                              显示的文本
   *  @property {Function} onNoClick `status=false` 时 `<Button />` `onClick`
   */
  static propTypes = {
    status: PropTypes.bool.isRequired,
    yesType: PropTypes.string,
    yesIcon: PropTypes.string,
    yesLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    onYesClick: PropTypes.func,
    noType: PropTypes.string,
    noIcon: PropTypes.string,
    noLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    onNoClick: PropTypes.func
  };

  /**
   *  按钮猛击处理器
   *  @param {Event} 猛击事件
   *  @description 根据 `status` 调用 `onYesClick` 或 `onNoClick`
   */
  onClick = e => {
    const { status, onYesClick, onNoClick } = this.props;
    const handler = status ? onYesClick : onNoClick;

    isFunction(handler) && handler(e, this);
  }

  render() {
    const { status, yesType, yesIcon, noType, noIcon, yesLabel, noLabel } = this.props;
    const type = status ? yesType : noType;
    const icon = status ? yesIcon : noIcon;
    const label = status ? yesLabel : noLabel;

    return (
      <li>
        <Button type={type} icon={icon} onClick={this.onClick}>
          {label}
        </Button>
      </li>
    );
  }
}
