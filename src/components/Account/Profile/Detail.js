import React, { PureComponent } from 'react';
import { Avatar, Divider, Icon } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import includes from 'lodash/includes';

import CardLayout from '~/src/components/layouts/CardLayout';
import DescList from '~/src/components/DescList';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import { permissions } from '~/src/const/permissions';

import styles from './styles.css';

const { Item: DescListItem } = DescList;

export default class Detail extends PureComponent {
  /**
   *  传递给 `props` 的类型检查
   *  @static
   *  @property {object} entry
   *  @property {entryProp} 条目属性
   *  @property {entryTitle} 条目名称
   *  @property {entryNameProp} 条目标题属性
   *  @property {Function} onUpdate function (account) {}
   */
  static propTypes = {
    entry: PropTypes.object,
    entryProp: PropTypes.string,
    entryTitle: PropTypes.string,
    entryNameProp: PropTypes.string,
    onUpdate: PropTypes.func
  };

  /**
   *  检查是否拥有权限 `permission`
   *  @param {string} permission
   *  @returns {boolean}
   */
  hasPermission(permission) {
    return includes(this.props.entry.permissions, permission);
  }

  render() {
    const { entry } = this.props;

    return (
      <CardLayout>
        <DescList title="账号信息">
          <DescListItem label="登录名" flex>
            <Avatar
              icon="user"
              size="small"
              src={toProcessImage(entry.avatar, { w: 64, h: 64 })}
            />
            <code>{entry.name}</code>
          </DescListItem>

          <DescListItem label="编号">
            <code>{entry._id}</code>
          </DescListItem>
        </DescList>

        <Divider />

        <DescList title="权限" col={1}>
          {permissions.map(({ key, label, items }) => (
            <DescListItem key={key} label={label}>
              <ul className={styles.permissions}>
                {items.map(({ key, label }) => (
                  <li
                    key={key}
                    className={classnames({ active: this.hasPermission(key) })}
                  >
                    <Icon type={this.hasPermission(key) ? 'check' : 'close'} />
                    {label}
                  </li>
                ))}
              </ul>
            </DescListItem>
          ))}
        </DescList>

        {/* <Divider />

        <pre>
          {JSON.stringify(entry, null, 2)}
        </pre> */}
      </CardLayout>
    );
  }
}
