/* global __VERSION__: true, __UPDATE_TIME__: true */
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Icon, Layout, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import keys from 'lodash/keys';

import ChangeLog from '~/src/components/ChangeLog';
import Header from './Header';
import Sider from './Sider';

import { routes, routeKeys } from '~/src/const/siders';
import { logo, title } from '~/src/const/config';
import * as actions from '~/src/actions/layout';
import styles from './styles.css';

@connect(
  ({ reducers }) => ({ collapsed: reducers.layout.collapsed }),
  dispatch => ({
    onCollapsed: collapsed => dispatch(actions.setLayoutCollapsed(collapsed))
  })
)
export default class Index extends PureComponent {
  toggle = () => {
    this.props.onCollapsed(!this.props.collapsed);
  }

  render() {
    const { collapsed } = this.props;
    const updateTime = moment(__UPDATE_TIME__).format('YYYY-MM-DD');

    return (
      <Layout className={styles.layout}>
        <Layout.Sider
          className={styles.sider}
          width={256}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="" />
              {!collapsed && (
                <h1>
                  {title}
                  <small>
                    <Tooltip title={`最后更新：${updateTime}`}>
                      {__VERSION__}
                    </Tooltip>
                  </small>
                </h1>
              )}
            </Link>
          </div>
          <Sider collapsed={collapsed} />
        </Layout.Sider>

        <Layout className={styles.main}>
          <Layout.Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Header />
          </Layout.Header>

          <Layout.Content className={styles.content}>
            <Switch>
              <Route path="/changelog" exact component={ChangeLog} />
              {routes.map(({ key, component }) => (
                <Route key={key} path={key} component={component} />
              ))}
              <Redirect from ="/" to={keys(routeKeys)[0]} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
