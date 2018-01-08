import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

const { TextArea } = Input;

/**
 *  表单多行输入框项
 *  @class
 */
export default class FormTextAreaItem extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    rules: PropTypes.array,
    placeholder: PropTypes.string,
    autosize: PropTypes.bool,
    onChange: PropTypes.func
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    placeholder: '输入点什么吧',
    autosize: true
  };

  /**
   *  值变更处理器
   *  @this 当前组件实例
   *  @param {string} value 变更的值
   */
  onChange = value => {
    if (isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      form,
      rules, initialValue, inputProps,
      placeholder,
      autosize,
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
          <TextArea
            autosize={autosize}
            placeholder={placeholder}
            {...inputProps}
            onChange={this.onChange}
          />
        )}
      </Form.Item>
    );
  }
}
