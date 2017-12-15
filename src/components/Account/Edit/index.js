import { Button, Form, Spin, message } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import ImageUploader from '@qiniu/ImageUploader';
import CardLayout from '@layout/CardLayout';

import PermissionsItem from '@form-item/Permissions';
import InputItem from '@form-item/Input';

import * as fieldSchema from '~/src/components/Account/fieldSchema';
import validateFields from '~/src/utils/form/validateFields';
import customRequest from '~/src/utils/qiniu/customRequest';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import genFields from './genFields';

import globalStyles from '~/src/index.css';

const { Item: FormItem } = Form;

/**
 *  编辑页面
 *  @class
 */
@Form.create()
@connect(mapMyToProps)
@injectApi('account', 'qiniu')
@injectProto('setStateAsync')
export default class Edit extends PureComponent {

  /**
   *  传递给 `props` 的类型检查
   *  @static
   *  @property {object} form
   *  @property {object} entry
   *  @property {entryProp} 条目属性
   *  @property {entryTitle} 条目名称
   *  @property {entryNameProp} 条目标题属性
   *  @property {Function} onUpdate function (account) {}
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    entry: PropTypes.object,
    entryProp: PropTypes.string,
    entryTitle: PropTypes.string,
    entryNameProp: PropTypes.string,
    onUpdate: PropTypes.func
  };

  /**
   *  状态字典
   */
  state = {
    submitting: false
  };

  /**
   *  自定义上传请求
   *  @param {React.Component} imageUploader 图片上传器实例
   *  @param customReq 自定义请求参数
   */
  customRequest = (uploader, customReq) => {
    customRequest(this, uploader, customReq, this.updateEntryAvatar);
  }

  /**
   *  更新条目头像
   *  @param {string} key 七牛存储键
  */
  updateEntryAvatar = async key => {
    const { entry, entryProp } = this.props;
    const { _id: entryId } = entry;
    const { [entryProp]: newEntry } = await this.updateAccountAvatar(entryId, key);

    this.onUpdate(newEntry);
    message.success('更新头像成功');
  };

  /**
   *  条目更新处理器
   *  @param {object} newEntry 新的条目信息
   */
  onUpdate = newEntry => {
    if (isFunction(this.props.onUpdate)) {
      this.props.onUpdate(newEntry);
    }
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
      const { form, entry, entryProp } = this.props;
      const { _id: entryId } = entry;
      await this.setStateAsync({ submitting: true });
      const body = await validateFields(form, fieldSchema, { group: 'permissions' });
      const { [entryProp]: newEntry } = await this.updateAccount(entryId, body);

      this.onUpdate(newEntry);
      message.success(`更新成功`);
      await this.setStateAsync({ submitting: false });
    }

    catch (err) {
      catchError(this, err, { loading: 'submitting' });
    }
  }

  render() {
    const { entry } = this.props;
    const { submitting } = this.state;
    const fields = genFields(this);

    return (
      <CardLayout>
        <Form className={globalStyles.form} onSubmit={this.onSubmit}>
          <Spin spinning={submitting}>

            {/* 封面 */}
            <FormItem {...fields.avatar}>
              <ImageUploader
                image={entry.avatar}
                customRequest={this.customRequest}
              />
            </FormItem>

            {/* 登录名 */}
            <InputItem {...fields.name} />

            {/* 密码 */}
            <InputItem {...fields.password} />

            {/* 权限 */}
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
