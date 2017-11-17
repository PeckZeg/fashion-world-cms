import { Button, Form, Input, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import BaseLayout from '~/src/components/My/BaseLayout';

import mapMyToProps from '~/src/utils/connect/mapMyToProps';

import * as fields from './fields';
import styles from './styles.css';

@connect(mapMyToProps)
@Form.create()
export default class Login extends PureComponent {
  state = {
    submiting: false
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ submiting: true }, () => {
      setTimeout(() => {
        this.setState({ submiting: false });
      }, 1024);
    });
  }

  render() {
    const { form } = this.props;
    const { submiting } = this.state;
    const { getFieldDecorator } = form;

    return (
      <BaseLayout>
        <Form className={styles.main} onSubmit={this.onSubmit}>
          <Form.Item>
            {getFieldDecorator(...fields.name)(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="登录名"
                disabled={submiting}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(...fields.password)(
              <Input
                type="password"
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="密码"
                disabled={submiting}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.submit}
              htmlType="submit"
              type="primary"
              size="large"
              loading={submiting}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </BaseLayout>
    );
  }
}
