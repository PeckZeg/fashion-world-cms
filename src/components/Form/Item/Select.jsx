import React, { PureComponent } from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

const { Option: SelectOption } = Select;
const { Item: FormItem } = Form;

/**
 *  表单选择项
 *  @class
 */
export default class SelectItem extends PureComponent {
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
    selectProps: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    placeholder: '输入点什么吧'
  };

  /**
   *  值改变事件处理器
   *  @this 当前组件实例
   *  @param value 改变的值
   */
  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      form, rules, initialValue, selectProps,
      children, options, placeholder,
      ...formItemProps
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
        })(
          <Select
            placeholder={placeholder}
            {...selectProps}
            onChange={this.onChange}
          >
            {children ? children : isArray(options) && options.map(opt => (
              <SelectOption key={opt.value} disabled={opt.disabled}>
                {isUndefined(opt.label) ? opt.value : opt.label}
              </SelectOption>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
};
