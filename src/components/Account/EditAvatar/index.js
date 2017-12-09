import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import isFunction from 'lodash/isFunction';

import ImageUploader from '@qiniu/ImageUploader';
import CardLayout from '@layout/CardLayout';

import customRequest from '~/src/utils/qiniu/customRequest';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';

@connect(mapMyToProps)
@injectProto('setStateAsync')
@injectApi('account', 'qiniu')
export default class EditAvatar extends PureComponent {

  /**
   *  自定义请求
   *  @param {React.Component} imageUploader 图片上传器实例
   *  @param customReq 自定义请求参数
   */
  customRequest = (imageUploader, customReq) => {
    customRequest(this, imageUploader, customReq, this.updateEntryAvatar);
  }

  /**
   *  更新条目头像
   *  @param {string} key 七牛存储键
   */
  updateEntryAvatar = async (key) => {
    const { entry, onUpdate } = this.props;

    if (!entry) {
      throw new Error('未知账号');
    }

    const { account } = await this.updateAccountAvatar(entry._id, key);

    if (isFunction(onUpdate)) {
      onUpdate(account);
    }
  }

  render() {
    const { entry } = this.props;

    if (!entry) return null;

    return (
      <CardLayout>
        <Row>
          <Col offset={4} span={16}>
            <ImageUploader
              image={entry.avatar}
              customRequest={this.customRequest}
            />
          </Col>
        </Row>
      </CardLayout>
    );
  }
}
