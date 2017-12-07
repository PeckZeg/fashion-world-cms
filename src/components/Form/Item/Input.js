import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

export default class FormInputItem extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    rules: PropTypes.array,
    placeholder: PropTypes.string
  };

  onChange = value => {
    if (isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      form,
      // field: { field, ...extraFieldOpts } = {},
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
          ...initialValue ? { initialValue } : {}
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
