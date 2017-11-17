import React, { PureComponent } from 'react';
import { Avatar, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '~/src/actions/layout';
import styles from './styles.css';

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
              <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
              {!collapsed && (
                <h1>Fashion World</h1>
              )}
            </Link>
          </div>
          <Sider collapsed={collapsed} />
        </Layout.Sider>

        <Layout>
          <Layout.Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <div className={styles.right}>
              <div className={styles.action}>
                <a href="javascript:;">
                  文档
                </a>
              </div>
              <div className={styles.action}>
                <Avatar icon="user" />
                PeckZeg
              </div>
            </div>
          </Layout.Header>
          <Layout.Content style={{
            margin: '24px 16px',
            minHeight: 280
          }}>
            Content
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
