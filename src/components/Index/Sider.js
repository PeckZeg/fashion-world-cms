import React, { PureComponent } from 'react';
import { withRouter, matchPath } from 'react-router';
import { Icon, Menu } from 'antd';

import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';

import { menus, keys, routeKeys } from '~/src/const/siders';

@withRouter
export default class Sider extends PureComponent {
  constructor(props) {
    super(props);

    const { location } = props;
    const { openKeys, selectedKeys } = this.keys(location.pathname);

    this.state = {
      historyListener: null,
      openKeys,
      selectedKeys
    };
  }

  componentDidMount() {
    const historyListener = this.props.history.listen(location => {
      this.setState(this.keys(location.pathname));
    });

    this.setState({ historyListener });
  }

  componentWillUnmount() {
    const { historyListener } = this.state;

    if (isFunction(historyListener)) {
      historyListener();
      this.setState({ historyListener: null });
    }
  }

  onSelect = ({ key }) => {
    this.setState(this.keys(key));
    this.props.history.push(key);
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

    if (keys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    }

    else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  }

  /**
   *  生成打开的菜单键和已选择的菜单键
   *  @param {string} key 菜单键
   *  @returns {object} keys 生成的各种键儿
   *  @returns {Array} keys.openKeys 打开的菜单键列表
   *  @returns {Array} keys.
   */
  keys(key) {
    let openKeys = [];

    forEach(routeKeys, (openKey, path) => {
      if (matchPath(key, { path })) {
        openKeys = [openKey];
        return false;
      }
    });

    return {
      openKeys,
      selectedKeys: [key]
    };
  }

  render() {
    const { openKeys, selectedKeys } = this.state;

    return (
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
        onOpenChange={this.onOpenChange}
      >
        {menus.map(({ key, label, icon, items }) => (
          <Menu.SubMenu
            key={key}
            title={<span><Icon type={icon} /><span>{label}</span></span>}
          >
            {items.filter(({ hidden }) => !hidden).map(({ key, icon, label }) => (
              <Menu.Item key={key}>
                <a href="javascript:;">
                  <Icon type={icon} />
                  <span>
                    {label}
                  </span>
                </a>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    );
  }
}
