import { Button, Form, Spin, message } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import CardLayout from '@layout/CardLayout';

import InputNumber from '@form-item/InputNumber';
import InputItem from '@form-item/Input';

import validateFields from '@util/form/validateFields';
import mapMyToProps from '@util/connect/mapMyToProps';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';
import genFields from './genFields';

import globalStyles from '~/src/index.css';

/**
 *  编辑关于信息
 *  @class
 */
 @Form.create()
 @connect(mapMyToProps)
 @injectApi('about')
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
      const body = await validateFields(form);
      const { [entryProp]: newEntry } = await this.updateAbout(entryId, body);

      this.onUpdate(newEntry);
      message.success(`更新成功`);
      await this.setStateAsync({ submitting: false });
    }

    catch (err) {
      catchError(this, err, { loading: 'submitting' });
    }
  };

  render() {
    const { submitting } = this.state;
    const fields = genFields(this);

    return (
      <CardLayout>
        <Form className={globalStyles.form} onSubmit={this.onSubmit}>
          <Spin spinning={submitting}>
            {/* 名称 */}
            <InputItem {...fields.name} />

            {/* 值 */}
            <InputItem {...fields.value} />

            {/* 排序值 */}
            <InputNumber {...fields.priority} />
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
};
