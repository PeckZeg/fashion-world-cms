import { Button, Form, Input, Icon, message } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import BaseLayout from '~/src/components/My/BaseLayout';

import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import validateFields from '~/src/utils/form/validateFields';
// import stringifyQuery from '~/src/utils/query/stringify';
import parseQuery from '~/src/utils/query/parse';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import * as myActions from '~/src/actions/my';
import * as fieldSchema from './fieldSchema';

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

  componentDidMount() {
    const nameInstance = this.props.form.getFieldInstance('name');
    const nameNode = ReactDOM.findDOMNode(nameInstance);
    const nameInput = nameNode.querySelector('input');

    if (nameInput) {
      nameInput.focus();
    }

    this.props.onToken(null);
  }

  onSubmit = e => {
    const { form, history, onToken, onProfile } = this.props;

    e.preventDefault();

    this.setState({ submiting: true }, async () => {
      try {
        const { name, password } = await validateFields(form, fieldSchema);
        const { apiKey, secretKey, expiresIn, account } = await this.login(name, password);
        const { redirect = '/' } = parseQuery(this.props.location.search);

        onToken({ apiKey, secretKey, expiresIn });
        onProfile(account);

        message.success(`账号 ${account.name} 登录成功！`);
        history.push(redirect);
        this.setState({ submiting: false });
      }

      catch (err) {
        catchError(this, err, { loading: 'submiting' });
      }
    });

    // this.setState({ submiting: true }, () => {
    //   setTimeout(() => {
    //     this.setState({ submiting: false });
    //   }, 1024);
    // });
  }

  render() {
    const { form } = this.props;
    const { submiting } = this.state;
    const { getFieldDecorator } = form;

    return (
      <BaseLayout>
        <div className={styles.main}>
          <Form onSubmit={this.onSubmit}>
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
        </div>
      </BaseLayout>
    );
  }
}
