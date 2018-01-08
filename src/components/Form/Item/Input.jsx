import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

export default class FormInputItem extends PureComponent {
  /**
   *  `props` 类型检查
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    rules: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  onChange = value => {
    if (isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      form,
      rules, initialValue, inputProps,
      placeholder = '输入点什么吧',
      ...restProps
    } = this.props;
    const { getFieldDecorator } = form;
    const { field, ...extraFieldOpts } = isString(this.props.field) ?
        { field: this.props.field } : this.props.field || {};

    return (
      <Form.Item {...restProps}>
        {getFieldDecorator(field, {
          ...extraFieldOpts,
          rules,
          ...!isUndefined(initialValue) ? { initialValue } : null
        })(
          <Input
            placeholder={placeholder}
            {...inputProps}
            onChange={this.onChange}
          />
        )}
      </Form.Item>
    );
  }
}
