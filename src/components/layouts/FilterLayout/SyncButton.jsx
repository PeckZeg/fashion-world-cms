import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';

import isFunction from 'lodash/isFunction';

import injectProto from '~/src/utils/injectProto';

/**
 *  同步按钮
 *  @class
 */
@injectProto('setStateAsync')
export default class SyncButton extends PureComponent {
  /**
   *  `props` 类型检查
   *  @property {Function} onClick 猛击事件处理器
   */
  static propTypes = {
    onClick: PropTypes.func
  };

  state = {
    loading: false
  };

  /**
   *  猛击处理事件
   *  @param {Event} e 事件
   */
  onClick = async e => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      e.preventDefault();
      await this.setStateAsync({ loading: true });
      await onClick();
      await this.setStateAsync({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Tooltip title="刷新">
        <Button
          type="dashed"
          icon="sync"
          loading={loading}
          onClick={this.onClick}
        />
      </Tooltip>
    );
  }
}
