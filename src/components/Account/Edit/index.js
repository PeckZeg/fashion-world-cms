import React, { PureComponent } from 'react';
import { Button, Form, Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import CardLayout from '@layout/CardLayout';

import PermissionsItem from '@form-item/Permissions';
import InputItem from '@form-item/Input';

import validateFields from '~/src/utils/form/validateFields';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import genFields from './genFields';

import globalStyles from '~/src/index.css';

@Form.create()
@connect(mapMyToProps)
@injectApi('account')
@injectProto('setStateAsync')
export default class Edit extends PureComponent {

  /**
   *  传递给 `props` 的类型检查
   *  @static
   *  @property {object} form
   *  @property {object} entry
   *  @property {Function} onUpdate function (account) {}
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    onUpdate: PropTypes.func
  };

  state = {
    submitting: false
  };

  /**
   *  重置表单
   */
  onReset = () => {
    this.props.form.resetFields();
  }

  /**
   *  提交表单
   *  @param {Event} e 表单事件
   */
  onSubmit = async e => {
    e.preventDefault();

    try {
      const { form, entry, onUpdate } = this.props;
      await this.setStateAsync({ submitting: true });
      const body = await validateFields(form, null, { group: 'permissions' });
      const { account } = await this.updateAccount(entry._id, body);

      if (isFunction(onUpdate)) {
        onUpdate(account);
      }

      await this.setStateAsync({ submitting: false });
    }

    catch (err) {
      catchError(this, err, { loading: 'submitting' });
    }
  }

  render() {
    const { submitting } = this.state;
    const fields = genFields(this);

    return (
      <CardLayout>
        <Form className={globalStyles.form} onSubmit={this.onSubmit}>
          <Spin spinning={submitting}>
            <InputItem {...fields.name} />

            <PermissionsItem {...fields.permissions} />
          </Spin>

          <Form.Item {...fields.submit}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
            <Button
              className={globalStyles.submitButton}
              type="dashed"
              onClick={this.onReset}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </CardLayout>
    );
  }
}
