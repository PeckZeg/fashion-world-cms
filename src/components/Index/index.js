import React, { PureComponent } from 'react';
import { Avatar, Menu, Icon, Layout } from 'antd';
import { connect } from 'react-redux';

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
            <a href="javascript:;">
              <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
              {!collapsed && (
                <h1>Fashion World</h1>
              )}
            </a>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
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
