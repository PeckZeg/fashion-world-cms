import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';

import includes from 'lodash/includes';

import { permissions } from '~/src/const/permissions';

import styles from './styles.css';

export default class TablePermissionsColumn extends PureComponent {
  static propTypes = {
    value: PropTypes.array.isRequired
  };

  hasPermission(permission) {
    return includes(this.props.value, permission);
  }

  tagColor(permission) {
    return this.hasPermission(permission) ? 'cyan' : void 0;
  }

  icon(permission) {
    return this.hasPermission(permission) ? 'check' : 'times';
  }

  render() {
    return (
      <ul className={styles.permissions}>
        {permissions.map(({ key, label, items }) => (
          <li key={key}>
            <h4>{label}</h4>

            {items.map(({ key, label }) => (
              <Tag key={key} color={this.tagColor(key)}>
                <Icon type={this.icon(key)} /> {label}
              </Tag>
            ))}
          </li>
        ))}
      </ul>
    );
  }
}
