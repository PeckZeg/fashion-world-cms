import { Link, Route, Switch, Redirect } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';

import keys from 'lodash/keys';

import { routes, routeKeys } from '~/src/const/siders';
import { logo, title } from '~/src/const/config';
import * as actions from '~/src/actions/layout';
import styles from './styles.css';

import Header from './Header';
import Sider from './Sider';

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
