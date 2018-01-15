import React, { PureComponent } from 'react';
import { Button, Form, Upload } from 'antd';

import isString from 'lodash/isString';

import styles from './styles.css';

const { Item: FormItem } = Form;

export default class UploadButton extends PureComponent {
  static defaultProps = {
    valuePropName: 'fileList',
    width: '100%'
  };

  render() {
    const {
      form, rules, initialValue, selectProps,
      children, options, placeholder, valuePropName, width,
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
          valuePropName
        })(
          <Upload className={styles.upload}>
            <Button style={{ width }} icon="upload">
              猛击上传
            </Button>
          </Upload>
        )}
      </FormItem>
    );
  }
}
