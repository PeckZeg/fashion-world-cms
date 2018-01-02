import React, { PureComponent } from 'react';
import { Checkbox, Form } from 'antd';
import PropTypes from 'prop-types';

import includes from 'lodash/includes';
import reduce from 'lodash/reduce';
import map from 'lodash/map';

import styles from './styles.css';

export default class PermissionGroup extends PureComponent {

  /**
   *  传递给 `props` 的类型
   *  @static
   *  @property {object} form
   *  @property {string} field
   *  @property {string|ReactNode} label
   *  @property {object[]} permissions
   *  @property {string[]} initialValue
   */
  static propTypes = {
    form: PropTypes.object,
    field: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    permissions: PropTypes.arrayOf(PropTypes.object),
    initialValue: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props);

    const { initialValue = [], permissions } = props;
    const options = map(permissions, ({ key, label }) => ({
      label,
      value: key
    }));
    const permissionKeys = map(permissions, 'key');
    const checkAll = this.checkAll(initialValue, permissionKeys);
    const indeterminate = this.indeterminate(checkAll, initialValue,
        permissionKeys);

    this.state = {
      options,
      permissionKeys,
      checkAll,
      indeterminate
    };
  }

  componentWillReceiveProps(nextProps) {
    const { form, field } = nextProps;
    const permissions = form.getFieldValue(field);
    const checkAll = this.checkAll(permissions);
    const indeterminate = this.indeterminate(checkAll, permissions);

    this.setState({ checkAll, indeterminate });
  }

  /**
   *  全选事件处理器
   *  @param {Event} e 事件
   */
  onAllChange = e => {
    const { form, field } = this.props;
    const { permissionKeys } = this.state;
    const { checked } = e.target;

    form.setFieldsValue({
      [field]: checked ? permissionKeys : []
    });

    this.setState({
      indeterminate: false,
      checkAll: checked
    })
  }

  /**
   *  复选框组变更事件处理器
   *  @param {string[]} permissions 选中的权限列表
   */
  onGroupChange = permissions => {
    const checkAll = this.checkAll(permissions);
    const indeterminate = this.indeterminate(checkAll, permissions);

    this.setState({ checkAll, indeterminate });
  }

  /**
   *  检查是否全选
   *  @param {string[]} permissions 检查的权限列表
   *  @param {string[]} [keys = this.state.permissionKeys] 权限列表
   *  @returns {boolean} 是否全选
   */
  checkAll = (permissions, keys = this.state.permissionKeys) => (
    reduce(keys, (all, permission) => (
      all && includes(permissions, permission)
    ), true)
  )

  /**
   *  检查不确定性
   *  @param {boolean} checkAll 是否已经全选
   *  @param {string[]} permissions 检查的权限列表
   *  @param {string[]} [keys = this.state.permissionKeys] 权限列表
   *  @returns {boolean} 不确定性
   */
  indeterminate = (checkAll, permissions, keys = this.state.permissionKeys) => (
    checkAll ? false : reduce(keys, (indeterminate, permission) => (
      indeterminate || includes(permissions, permission)
    ), false)
  )

  render() {
    const { form, field, initialValue } = this.props;
    const { options, indeterminate, checkAll } = this.state;
    const { getFieldDecorator } = form;

    const label = (
      <Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={this.onAllChange}
      >
        {this.props.label}
      </Checkbox>
    );

    return (
      <Form.Item
        className={styles.permissionGroup}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        label={label}
        // colon={false}
      >
        {getFieldDecorator(field, {
          ...initialValue ? { initialValue } : {}
        })(
          <Checkbox.Group
            options={options}
            onChange={this.onGroupChange}
          />
        )}
      </Form.Item>
    );
  }
}
