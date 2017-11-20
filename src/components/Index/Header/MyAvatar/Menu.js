import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, message } from 'antd';

import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import stringifyQuery from '~/src/utils/query/stringify';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';

@withRouter
@connect(mapMyToProps)
@injectApi('my')
export default class Menu extends PureComponent {
  state = {
    logoutLoading: false
  };

  onLogout = e => {
    e.preventDefault();

    if (this.state.logoutLoading) return ;

    this.setState({ logoutLoading: true }, async () => {
      try {
        const { history, location } = this.props
        const { pathname, search } = location;
        const redirect = `${pathname}${search}`;
        const { name } = this.props.my.profile;

        await this.logout();
        message.success(`账号 ${name} 登出成功！`);
        history.push(`/my/login${stringifyQuery({ redirect })}`);
      }

      catch (err) {
        catchError(this, err);
      }
    });
  }

  render() {
    const { logoutLoading } = this.state;

    return (
      <ul>
        <li>
          <a className="disabled" href="javascript:;">
            <Icon type="paper-clip" />
            账号设置
          </a>
        </li>
        <li>
          <a className="disabled" href="javascript:;">
            <Icon type="rocket" />
            我的操作日志
          </a>
        </li>
        <li className="divider"></li>
        <li>
          <a href="javascript:;" onClick={this.onLogout}>
            <Icon type={logoutLoading ? 'loading' : 'logout'} />
            退出登录
          </a>
        </li>
      </ul>
    );
  }
}
