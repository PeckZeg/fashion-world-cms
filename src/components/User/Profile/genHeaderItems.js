import React, { Fragment } from 'react';
import { Button } from 'antd';

import assign from 'lodash/assign';

import DescList from '@components/DescList';

import formatTimestamp from '@util/formatTimestamp';
import formatMobile from '@util/formatMobile';

const { Item: DescListItem } = DescList;

/**
 *  生成头部项
 *  @param {React.Component} com 当前组件实例
 *  @param {object} entry 条目
 *  @returns {object}
 */
export default function(com, entry) {
  let args = {};


  if (entry) {
    const title = entry.name;
    const logo = {
      url: entry.avatar,
      visible: true,
      icon: 'user',
      qiniu: true,
      openable: true,
      zoomIn: true,
      onClick: com.openImageViewer
    };
    const content = (
      <DescList>
        <DescListItem label="手机号码">
          {formatMobile(entry.mobile)}
        </DescListItem>
        <DescListItem label="注册时间">
          {formatTimestamp(entry.registerAt, { fromNow: true })}
        </DescListItem>
        <DescListItem label="创建时间">
          {formatTimestamp(entry.createAt, { fromNow: true })}
        </DescListItem>
      </DescList>
    );
    const action = (
      <Fragment>
        <Button disabled>解除微信绑定</Button>
      </Fragment>
    );

    assign(args, { title, logo, content, action });
  }

  return args;
};
