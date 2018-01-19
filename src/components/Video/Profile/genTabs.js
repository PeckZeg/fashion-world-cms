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
    const { params: { videoId } } = match;

    tabList.tabs = [
      {
        key: `/video/${videoId}`,
        tab: (
          <Fragment>
            <Icon type="profile" />
            详情
          </Fragment>
        )
      },
      {
        key: `/video/${videoId}/player`,
        tab: (
          <Fragment>
            <Icon type="video-camera" />
            预览
          </Fragment>
        )
      },
      {
        key: `/video/${videoId}/avinfo`,
        tab: (
          <Fragment>
            <Icon type="file-text" />
            元信息
          </Fragment>
        )
      },
      {
        key: `/video/${videoId}/edit`,
        tab: (
          <Fragment>
            <Icon type="edit" />
            编辑
          </Fragment>
        )
      },
      {
        key: `/video/${videoId}/edit/subtitle-files`,
        tab: (
          <Fragment>
            <Icon type="code-o" />
            编辑字幕文件
          </Fragment>
        ),
        disabled: true
      }
    ];
  }

  return tabList;
};
