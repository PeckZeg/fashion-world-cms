import React, { PureComponent } from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import map from 'lodash/map';

import Option from './Option';

import { GENDERS } from '@const/genders';

const { Option: SelectOption } = Select;
const { Item: FormItem } = Form;

/**
 *  性别选择器
 *  @class
 */
export default class FormGenderSelectItem extends PureComponent {
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

  /**
   *  值改变处理器
   *  @param {string} value 改变的值
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
      ...formItemProps
    } = this.props;
    const { getFieldDecorator } = form;
    const { field, ...extraFieldOpts } = isString(this.props.field) ?
        { field: this.props.field } : (this.props.field || {});

    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(field, {
          ...extraFieldOpts,
          rules,
          ...!isUndefined(initialValue) ? { initialValue } : null
        })(
          <Select onChange={this.onChange}>
            {map(GENDERS, option => (
              <SelectOption key={option.key}>
                <Option {...option} />
              </SelectOption>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
}
