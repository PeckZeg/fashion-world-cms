import { Button, Form, Spin, message } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';
import pick from 'lodash/pick';
import map from 'lodash/map';

import CardLayout from '@layout/CardLayout';

import SubtitleFileItem from './SubtitleFile';

import validateFields from '@util/form/validateFields';
import customRequest from '@util/qiniu/customRequest';
import mapMyToProps from '@util/connect/mapMyToProps';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';
import splice from '@util/array/splice';

import formItemLayoutWithOutLabel from '@const/form/submitLayout';
import formItemLayout from '@const/form/itemLayout';
import globalStyles from '~/src/index.css';

const { Item: FormItem } = Form;

/**
 *  编辑字幕文件
 *  @class
 */
@Form.create()
@connect(mapMyToProps)
@injectApi('video', 'qiniu')
@injectProto('setStateAsync')
export default class EditSubtitleFiles extends PureComponent {
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

  static defaultProps = {
    field: 'subtitleFiles',
    label: '字幕'
  };

  state = {
    submitting: false
  };

  /**
   *  条目更新处理器
   *  @this 当前组件实例
   *  @param {object} newEntry 新的条目信息
   */
  onUpdate = newEntry => {
    if (isFunction(this.props.onUpdate)) {
      this.props.onUpdate(newEntry);
    }
  };

  /**
   *  重置表单
   *  @this 当前组件实例
   */
  onReset = () => {
    this.props.form.resetFields();
    this.forceUpdate();
  };

  onItemChange = (idx, value) => {
    const { field, form } = this.props;
    const { getFieldValue, setFieldsValue } = form;
    let subtitleFiles = splice(getFieldValue(field), idx, 1, value);

    setFieldsValue({ subtitleFiles });
  };

  onSubmit = async e => {
    e.preventDefault();

    try {
      await this.setStateAsync({ submitting: true });
      const { form, field, entry, entryProp } = this.props;
      const { _id: entryId } = entry;
      const body = await validateFields(form);
      body[field] = map(body[field], o => pick(o, ['key', 'lang']));
      const {
        [entryProp]: newEntry
      } = await this.updateVideoSubtitleFiles(entryId, body);

      this.onUpdate(newEntry);
      message.success(`更新成功`);
    }

    catch (err) {
      catchError(this, err);
    }

    finally {
      this.setState({ submitting: false });
    }
  }

  render() {
    const { form, entry, field, label } = this.props;
    const { submitting } = this.state;
    const { getFieldDecorator, getFieldValue } = form;
    // const { subtitleFiles } = entry;

    getFieldDecorator(field, { initialValue: entry.subtitleFiles });

    let subtitleFiles = getFieldValue(field);

    return (
      <CardLayout>
        <Form className={globalStyles.form} onSubmit={this.onSubmit}>
          <Spin spinning={submitting}>
            {subtitleFiles.map((subtitleFile, idx) => (
              <FormItem
                key={idx}
                {...idx === 0 ? formItemLayout : formItemLayoutWithOutLabel}
                label={idx === 0 ? label : ''}
              >
                {getFieldDecorator(`${field}-${idx}`, {
                  initialValue: subtitleFile
                })(
                  <SubtitleFileItem
                    onChange={this.onItemChange.bind(this, idx)}
                  />
                )}
              </FormItem>
            ))}

            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" icon="upload" style={{ width: '100%' }}>
                上传字幕
              </Button>
            </FormItem>

            <FormItem {...formItemLayoutWithOutLabel}>
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
          </Spin>
        </Form>
      </CardLayout>
    );
  }
}
