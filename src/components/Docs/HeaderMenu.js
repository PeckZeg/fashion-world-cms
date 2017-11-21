import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, matchPath } from 'react-router';

import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';

import styles from './styles.css';
import items from './routes';

@withRouter
export default class headerMenu extends PureComponent {
  constructor(props) {
    super(props);

    const selectedKeys = this.selectedKeys(props.location.pathname);

    this.state = {
      selectedKeys,
      historyListener: null
    };
  }

  componentDidMount() {
    const historyListener = this.props.history.listen(({ pathname }) => {
      this.setState({ selectedKeys: this.selectedKeys(pathname) });
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

  onSelect = ({ selectedKeys }) => {
    this.props.history.push(selectedKeys[0]);
    this.setState({ selectedKeys });
  }

  /**
   *  获取已选择的键列表
   *  @param {string} pathname 路径
   *  @returns {Array} 已选择的键列表
   */
  selectedKeys(pathname) {
    let selectedKeys = [];

    forEach(items, ({ key }) => {
      if (matchPath(pathname, { path: key })) {
        selectedKeys.push(key);
        return false;
      }
    });

    return selectedKeys;
  }

  render() {
    const { selectedKeys } = this.state;

    return (
      <Menu
        className={styles.headerMenu}
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
      >
        <Menu.Item key="/">
          <Icon type="left" />
          返回
        </Menu.Item>
        {items.map(({ key, label }) => (
          <Menu.Item key={key}>
            {label}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
