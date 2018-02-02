import React, { Fragment } from 'react';
import { Icon } from 'antd';

/**
 *  生成标签页列表
 *  @param {React.Component} com 当前组件实例
 *  @param {object} [location] 坐标对象
 *  @param {object} [match] 匹配对象
 */
export default function(com, location, match) {
  location = location || com.props.location;
  match = match || com.props.match;

  const { pathname: defaultTab } = location;
  let tabList = { defaultTab, tabs: [] };

  if (match) {
    const { params: { bannerId } } = match;

    tabList.tabs = [
      {
        key: `/banner/${bannerId}`,
        tab: (
          <Fragment>
            <Icon type="profile" />
            详情
          </Fragment>
        )
      },
      {
        key: `/banner/${bannerId}/edit`,
        tab: (
          <Fragment>
            <Icon type="edit" />
            编辑
          </Fragment>
        )
      }
    ];
  }

  return tabList;
};
