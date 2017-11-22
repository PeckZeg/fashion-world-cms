import { Redirect, Route, withRouter, matchPath } from 'react-router';
import React, { PureComponent } from 'react';
// import { Router, matchPath } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import { Layout } from 'antd';

import keys from 'lodash/keys';

import ApiContent from '~/src/components/Docs/Api/ApiContent';
import Sider from './Sider';

import styles from '~/src/components/Docs/styles.css';
import { routes, routeKeys } from '~/src/components/Docs/const/siders/api';

@withRouter
export default class ApiPage extends PureComponent {
  /**
   *  路由渲染器
   *  @param {object} props
   *  @returns {ReactNode}
   */
  renderRoute = props => {
    const { location } = { ...props };
    const route = routes.filter(({ key }) => (
      matchPath(location.pathname, { path: key, exact: true })
    ))[0];

    if (!route) {
      return <Redirect to={keys(routeKeys)[0]} />;
    }

    return (
      <QueueAnim className={styles.queueAnim} type={['bottom', 'top']} duration={666}>
        <Route
          key={location.pathname}
          location={location}
          path={route.key}
          render={props => <ApiContent {...props} {...route.config} />}
        />
      </QueueAnim>
    );
  }

  render() {
    return (
      <Layout className={styles.main}>
        <Layout.Sider
          className={styles.sider}
          width={256}
        >
          <Sider />
        </Layout.Sider>

        <Route render={this.renderRoute} />
      </Layout>
    );
  }
}
