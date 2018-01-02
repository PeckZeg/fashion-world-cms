import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import includes from 'lodash/includes';
import filter from 'lodash/filter';
import map from 'lodash/map';

import Group from './Group';

import { permissions } from '~/src/const/permissions';

/**
 *  [表单项] 权限选择器
 *  @class
 */
export default class FormPermissionsItem extends PureComponent {

  /**
   *  传递给 `props` 的类型
   *  @static
   *  @property {object} form
   *  @property {string} field
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired
  };

  /**
   *  获取每个权限组的初始值
   *  @param {object[]} permissions 权限组值
   */
  initGroupValue(permissions) {
    const { initialValue } = this.props;
    const keys = map(permissions, 'key');

    return filter(initialValue, key => includes(keys, key));
  }

  render() {
    const { form, field, ...resetProps } = this.props;

    return (
      <Form.Item label="权限" {...resetProps}>
        {permissions.map(({ key, label, items }) => (
          <Group
            key={key}
            form={form}
            field={`${field}-${key}`}
            label={label}
            permissions={items}
            initialValue={this.initGroupValue(items)}
          />
        ))}
      </Form.Item>
    );
  }
}
