import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderMenu from './HeaderMenu';

import styles from './styles.css';
import routes from './routes';

export default class BaseLayout extends PureComponent {
  render() {
    return (
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <Link className={styles.logo} to="/docs">
            <img src={`${process.env.PUBLIC_URL}/images/api.svg`} alt="" />
            接口文档
          </Link>

          <HeaderMenu />
        </Layout.Header>

        <Switch>
          {routes.map(({ key, component }) => (
            <Route key={key} path={key} component={component} />
          ))}
          <Redirect from="/" to={routes[0].key} />
        </Switch>
      </Layout>
    );
  }
}
