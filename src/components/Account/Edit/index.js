import React, { PureComponent } from 'react';
import { Button, Divider, Form } from 'antd';

import CardLayout from '~/src/components/layouts/CardLayout';
import PermissionsItem from '@form-item/Permissions';
import InputItem from '@form-item/Input';

import injectProto from '~/src/utils/injectProto';
import genFields from './genFields';

import globalStyles from '~/src/index.css';

@Form.create()
export default class Edit extends PureComponent {
  onResetClick = () => {
    this.props.form.resetFields();
  }

  render() {
    const fields = genFields(this);

    return (
      <CardLayout>
        <Form className={globalStyles.form}>
          <InputItem {...fields.name} />

          <PermissionsItem {...fields.permissions} />

          <Form.Item {...fields.submit}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button
              className={globalStyles.submitButton}
              type="dashed"
              onClick={this.onResetClick}
            >
              重置
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        {/* <pre>
          {JSON.stringify(this.props.entry, null, 2)}
        </pre>

        <Divider /> */}

        <pre>
          {JSON.stringify(this.props.form.getFieldsValue(), null, 2)}
        </pre>
      </CardLayout>
    );
  }
}
