import React, { PureComponent } from 'react';
import { Divider, Form, Input } from 'antd';

import CardLayout from '~/src/components/layouts/CardLayout';
import InputItem from '@form-item/Input';

const { Item: FormItem } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

@Form.create()
export default class Edit extends PureComponent {
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    console.log(form);

    return (
      <CardLayout>
        <Form style={{ margin: '16px' }}>
          <InputItem
            form={form}
            label="登录名"
            field="name"
            {...formItemLayout}
          />

          <FormItem
            label="登录名"
            {...formItemLayout}
          >
            {getFieldDecorator('name')(
              <Input />
            )}
          </FormItem>
        </Form>

        <Divider />

        <pre>
          {JSON.stringify(this.props.entry, null, 2)}
        </pre>
      </CardLayout>
    );
  }
}
