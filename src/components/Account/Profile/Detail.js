import React, { PureComponent } from 'react';
import { Divider, Icon } from 'antd';
import classnames from 'classnames';

import includes from 'lodash/includes';

import CardLayout from '~/src/components/layouts/CardLayout';
import DescList from '~/src/components/DescList';

import { permissions } from '~/src/const/permissions';

import styles from './styles.css';

const { Item: DescListItem } = DescList;

export default class Detail extends PureComponent {
  hasPermission(permission) {
    return includes(this.props.entry.permissions, permission);
  }

  render() {
    const { entry } = this.props;

    return (
      <CardLayout>
        <DescList title="账号信息">
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
