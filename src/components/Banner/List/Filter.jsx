import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import FilterLayout from '@components/layouts/FilterLayout';

const { InputSearch, SyncButton, ChannelSelect } = FilterLayout;

/**
 *  过滤器
 *  @class
 */
@withRouter
export default class Filter extends PureComponent {
  /**
   *  `props` 类型检查
   *  @property {Function} onSync 同步方法
   */
  static propTypes = {
    onSync: PropTypes.func
  };

  render() {
    const { onSync } = this.props;

    return (
      <FilterLayout>
        <InputSearch field="name" placeholder="搜索频道名" />
        <ChannelSelect />
        <SyncButton onClick={onSync} />
      </FilterLayout>
    );
  }
}
