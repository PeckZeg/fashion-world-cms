import { Button, Form, Spin, Select, Icon, message } from 'antd';
import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Animate from 'rc-animate';

import PageHeaderLayout from '@layout/PageHeaderLayout';
import Result from 'ant-design-pro/lib/Result';
import CardLayout from '@layout/CardLayout';

import TextAreaItem from '@form-item/TextArea';
import SelectItem from '@form-item/Select';
import InputItem from '@form-item/Input';
import UniqKey from '@util/UniqKey';

import validateFields from '@util/form/validateFields';
import mapMyToProps from '@util/connect/mapMyToProps';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';

import submitFormLayout from '@const/form/submitLayout';
import { types } from '@const/version/types';
import globalStyles from '~/src/index.css';
import genFields from './genFields';
import genResult from './genResult';

const { Option: SelectOption } = Select;
const { Item: FormItem } = Form;

@Form.create()
@connect(mapMyToProps)
@withRouter
@injectApi('version', 'qiniu')
@injectProto('setStateAsync')
export default class Create extends PureComponent {
  state = {
    submitting: false,
    result: null,

    docTitle: '创建版本',

    entryProp: 'version',
    entryTitle: '版本',
    entryNameProp: 'title'
  };

  uniqKey = new UniqKey();

  /**
   *  更新页面地址
   *  @this 当前组件实例
   */
  pushState = pathname => this.props.history.push(pathname);

  /**
   *  返回表单
   *  @this 当前组件实例
   */
  backToForm = () => this.setState({ submitting: false, result: null });

  /**
   *  重置表单
   *  @this 当前组件实例
   */
  onReset = () => this.props.form.resetFields();

  /**
   *  提交表单
   *  @this 当前组件实例
   *  @param {Event} e 表单事件
   */
  onSubmit = async e => {
    e.preventDefault();

    try {
      const { form } = this.props;
      const { entryProp, entryTitle, entryNameProp } = this.state;
      await this.setStateAsync({ submitting: true });
      const body = await validateFields(form);
      // return console.log(body);
      const { [entryProp]: entry } = await this.createVersion(body);

      message.success(`创建${entryTitle} ${entry[entryNameProp]} 成功`);

      await this.setStateAsync({
        submitting: false,
        result: genResult(this, 'success', { entry })
      });
    }

    catch (err) {
      catchError(this, err);
      await this.setStateAsync({
        submitting: false,
        result: genResult(this, 'error', { err })
      });
    }
  };

  renderResult() {
    return (
      <Result key={this.uniqKey.key('form')} {...this.state.result} />
    );
  }

  renderForm(fields) {
    const { submitting } = this.state;

    return (
      <Form
        key={this.uniqKey.key('form')}
        className={globalStyles.form}
        onSubmit={this.onSubmit}
      >
        <Spin spinning={submitting}>
          {/* 更新平台 */}
          <SelectItem {...fields.type}>
            {types.map(({ key, label, icon }) => (
              <SelectOption key={key}>
                <Icon type={icon} style={{ marginRight: '0.5em' }} />
                {label}
              </SelectOption>
            ))}
          </SelectItem>

          {/* 版本 */}
          <InputItem {...fields.version} />

          {/* 链接 */}
          <InputItem {...fields.link} />

          {/* 名称 */}
          <InputItem {...fields.title} />

          {/* 描述 */}
          <TextAreaItem {...fields.description} />
        </Spin>

        <FormItem {...submitFormLayout}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            创建
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
    );
  };

  render() {
    const { docTitle, result } = this.state;
    const fields = genFields(this);

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout>
          <CardLayout>
            <Animate
              component=""
              transitionName="fade"
              transitionAppear
              transitionLeave={false}
            >
              {result ? this.renderResult() : this.renderForm(fields)}
            </Animate>
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
};
