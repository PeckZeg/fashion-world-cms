import { DatePicker, Form, Icon, Modal, Spin } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';

import injectProto from '~/src/utils/injectProto';
import onRef from '~/src/utils/component/onRef';
import styles from './styles.css';

const { Item: FormItem } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 14 }
  }
};

@Form.create()
@onRef
@injectProto('setStateAsync')
export default class TimeingPublishModal extends PureComponent {
  /**
   *  `props` 类型检测
   *  @property {string|ReactNode} title
   *  @property {Function} onSubmit Function(modal, form, entry)
   */
  static propTypes = {
    field: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    field: 'publishAt',
    title: (
      <Fragment>
        <Icon type="clock-circle-o" />
        定时发布
      </Fragment>
    )
  };

  state = {
    now: moment().startOf('days'),
    title: null,
    submitting: false,
    visible: false,
    entry: null
  };

  /**
   *  开始提交表单
   *  @returns {Promise}
   */
  startSubmit = async () => this.setStateAsync({ submitting: true });

  /**
   *  停止提交表单
   *  @returns {Promise}
   */
  endSubmit = async () => this.setStateAsync({ submitting: false });

  /**
   *  打开模态
   *  @param {object} [entry] 待搞事情的条目
   *  @param {object} [extraState] 额外的 `state`
   *  @returns {Promise}
   */
  open = async (entry, extraState) => this.setStateAsync({
    ...extraState,
    entry: isPlainObject(entry) ? entry : null,
    visible: true,
  });

  /**
   *  关闭模态
   *  @param {object} [state] `state`
   *  @returns {Promise}
   */
  close = async state => this.setStateAsync({
    ...state,
    title: null,
    entry: null,
    visible: false
  });

  /**
   *  判断选择的日期是否低于当前时间
   */
  disabledDate = date => date ? date < this.state.now : false;

  /**
   *  猛击确定按钮的事件处理器
   */
  onOk = () => {
    const { onSubmit, form } = this.props;

    if (isFunction(onSubmit)) {
      onSubmit(this, form, this.state.entry);
    }
  }

  /**
   *  关闭模态时的事件处理器
   */
  onCancel = () => this.setState({ visible: false });

  /**
   *  关闭模态后重置表单
   */
  afterClose = () => this.props.form.resetFields();

  render() {
    const { field, form } = this.props;
    const { visible, submitting } = this.state;
    const { getFieldDecorator } = form;
    const title = this.state.title || this.props.title;

    return (
      <Modal
        className={styles.modal}
        title={title}
        visible={visible}
        confirmLoading={submitting}
        afterClose={this.afterClose}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Spin spinning={submitting}>
          <Form>
            <FormItem
              label="选择时间"
              {...formItemLayout}
            >
              {getFieldDecorator(field, {
                rules: [
                  { required: true, message: '需要选择一个时间' }
                ]
              })(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  placeholder="请选择一个时间"
                />
              )}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
