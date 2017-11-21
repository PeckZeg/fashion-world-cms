import { Redirect, Route, Switch, withRouter } from 'react-router';
import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import keys from 'lodash/keys';

import ApiContent from '~/src/components/Docs/Api/ApiContent';
import Sider from './Sider';

import styles from '~/src/components/Docs/styles.css';
import { routes, routeKeys } from '~/src/components/Docs/const/siders/api';

@withRouter
export default class ApiPage extends PureComponent {
  render() {
    return (
      <Layout className={styles.main}>
        <Layout.Sider
          className={styles.sider}
          width={256}
        >
          <Sider />
        </Layout.Sider>

        <Switch>
          {routes.map(({ key, config }) => (
            <Route
              key={key}
              path={key}
              exact
              render={props => <ApiContent {...props} {...config} />}
            />
          ))}
          <Redirect from ="/" to={keys(routeKeys)[0]} />
        </Switch>
      </Layout>
    );
  }
}
