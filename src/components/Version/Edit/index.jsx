import { Button, Form, Spin, Input, Icon, message } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import ImageUploader from '@qiniu/ImageUploader';
import CardLayout from '@layout/CardLayout';

import InputNumberItem from '@form-item/InputNumber';
import TextAreaItem from '@form-item/TextArea';
import InputItem from '@form-item/Input';

import validateFields from '@util/form/validateFields';
import customRequest from '@util/qiniu/customRequest';
import mapMyToProps from '@util/connect/mapMyToProps';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';
import genFields from './genFields';

import globalStyles from '~/src/index.css';

const { Item: FormItem } = Form;

@Form.create()
@connect(mapMyToProps)
@injectApi('version', 'qiniu')
@injectProto('setStateAsync')
export default class Edit extends PureComponent {
  /**
   *  `props` 类型检查
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

  state = {
    submitting: false
  };

  /**
   *  自定义上传请求
   *  @param {React.Component} imageUploader 图片上传器实例
   *  @param customReq 自定义请求参数
   */
  customRequest = (uploader, customReq) => {
    customRequest(this, uploader, customReq, this.updateEntryCover);
  }

  /**
   *  更新频道封面
   *  @param {string} key 七牛存储键
   */
  updateEntryCover = async key => {
    const { entry, entryProp } = this.props;
    const { _id: entryId } = entry;
    const { [entryProp]: newEntry } = await this.updateVersionCover(
      entryId, key
    );

    this.onUpdate(newEntry);
    message.success('更新成功');
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
  onReset = () => this.props.form.resetFields();

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
      const body = await validateFields(form, null, { nil: true });
      const { [entryProp]: newEntry } = await this.updateVersion(entryId, body);

      this.onUpdate(newEntry);
      message.success(`更新成功`);
      await this.setStateAsync({ submitting: false });
    }

    catch (err) {
      catchError(this, err, { loading: 'submitting' });
    }
  };

  onChannelChange = channelId => this.setState({ channelId });

  render() {
    const { entry } = this.props;
    const { submitting } = this.state;
    const fields = genFields(this);

    return (
      <CardLayout>
        <Form className={globalStyles.form} onSubmit={this.onSubmit}>
          <Spin spinning={submitting}>
            {/* 封面 */}
            <FormItem {...fields.cover}>
              <ImageUploader
                image={entry.cover}
                customRequest={this.customRequest}
              />
            </FormItem>

            <FormItem {...fields.type}>
              <Input
                prefix={<Icon type="lock" />}
                value={entry.type}
                readOnly
              />
            </FormItem>

            <FormItem {...fields.version}>
              <Input
                prefix={<Icon type="lock" />}
                value={entry.version}
                readOnly
              />
            </FormItem>

            {/* 链接 */}
            <InputItem {...fields.link} />

            {/* 标题 */}
            <InputItem {...fields.title} />

            {/* 描述 */}
            <TextAreaItem {...fields.description} />
          </Spin>

          <FormItem {...fields.submit}>
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
          </FormItem>
        </Form>
      </CardLayout>
    );
  }
};
