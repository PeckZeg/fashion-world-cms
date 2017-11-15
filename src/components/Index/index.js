import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';

import styles from './styles.css';

export default class Index extends Component {
  state = {
    collapsed: false
  };

  render() {
    const { collapsed } = this.state;

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
          <Layout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
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
