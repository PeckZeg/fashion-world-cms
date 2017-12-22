import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tag, Icon } from 'antd';

import isNil from 'lodash/isNil';
import get from 'lodash/get';

import CardLayout from '@components/layouts/CardLayout';
import DescList from '@components/DescList';

import toProcessImage from '@util/qiniu/toProcessImage';
import formatMobile from '@util/formatMobile';

import { getGender } from '@const/genders';
import * as colors from '@const/colors';

const { Item: DescListItem } = DescList;

/**
 *  用户详情信息
 *  @class
 */
export default class Detail extends PureComponent {
  /**
   *  传递给 `props` 的类型检查
   *  @static
   *  @property {object} entry
   *  @property {entryProp} 条目属性
   *  @property {entryTitle} 条目名称
   *  @property {entryNameProp} 条目标题属性
   *  @property {Function} onUpdate function (newEntry) {}
   */
  static propTypes = {
    entry: PropTypes.object,
    entryProp: PropTypes.string,
    entryTitle: PropTypes.string,
    entryNameProp: PropTypes.string,
    onUpdate: PropTypes.func
  };

  render() {
    const { entry } = this.props;
    const openid = get(entry, 'thirdParty.weixin.openid');
    const gender = getGender(entry.gender);

    return (
      <CardLayout>
        <DescList title="基本信息">
          <DescListItem label="编号">
            <code>{entry._id}</code>
          </DescListItem>

          <DescListItem label="昵称" flex>
            <Avatar
              icon="picture"
              size="small"
              src={toProcessImage(entry.avatar, { w: 64, h: 64 })}
            />
            <code>{entry.name}</code>
          </DescListItem>

          <DescListItem label="性别">
            <Tag color={gender.color}>
              <Icon type={gender.icon} />
            </Tag>
            {gender.label}
          </DescListItem>

          <DescListItem label="手机号码">
            {formatMobile(entry.mobile)}
          </DescListItem>

          <DescListItem label="第三方登录">
            <Tag
              style={{ fontSize: '14px' }}
              color={!isNil(openid) ? colors.wechat : null}
            >
              <Icon type="wechat" />
            </Tag>
            {isNil(openid) ? '未绑定' : '已绑定'}
          </DescListItem>
        </DescList>
      </CardLayout>
    );
  }
}
