import { Button, Form, Input, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import BaseLayout from '~/src/components/My/BaseLayout';

import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import injectApi from '~/src/utils/injectApi';
import * as myActions from '~/src/actions/my';

import * as fields from './fields';
import styles from './styles.css';

@connect(mapMyToProps, dispatch => ({
  onToken: token => dispatch(myActions.setMyToken(token)),
  onProfile: profile => dispatch(myActions.setMyProfile(profile))
}))
@Form.create()
@injectApi('my')
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
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
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
