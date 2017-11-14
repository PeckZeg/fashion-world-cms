import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';

export default class Index extends Component {
  state = {
    collapsed: false
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">
            <a href="javascript:;">
              <img />
              <h1>Fashion World</h1>
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
            padding: 24,
            background: '#fff',
            minHeight: 280
          }}>
            Content
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
