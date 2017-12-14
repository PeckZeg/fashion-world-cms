import React, { PureComponent } from 'react';
import { Form, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

const { Item: FormItem } = Form;

export default class FormInputNumberItem extends PureComponent {
  /**
   *  `props` 类型检查
   *  @property {object} form
   *  @property {object|string} field
   *  @property {object[]} rules
   *  @property {string} placeholder
   *  @property {Function} onChange Function(value: number|string)
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    rules: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  /**
   *  输入改变事件处理器
   *  @param {number} value 改变后的数值
   */
  onChange = value => {
    if (isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  };

  render() {
    const {
      form,
      rules,
      initialValue,
      inputProps,
      placeholder = '输入点什么吧',
      onChange,
      ...formItemProps,
    } = this.props;
    const { getFieldDecorator } = form;
    const { field, ...fieldProps } = isString(this.props.field) ?
        { field: this.props.field } : this.props.field || {};

    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(field, {
          ...fieldProps,
          rules,
          ...!isUndefined(initialValue) ? { initialValue } : null
        }) (
          <InputNumber
            placeholder={placeholder}
            {...inputProps}
            onChange={this.onChange}
          />
        )}
      </FormItem>
    );
  }
}
