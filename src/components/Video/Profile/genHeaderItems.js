import React, { Fragment } from 'react';
import { Button } from 'antd';

import assign from 'lodash/assign';

import SwitchButton from '@components/SwitchButton';
import DescList from '@components/DescList';

import formatTimestamp from '@util/formatTimestamp';

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
    const title = entry.title;
    const logo = {
      url: entry.cover,
      visible: true,
      icon: 'picture',
      qiniu: true,
      openable: true,
      zoomIn: true,
      onClick: com.openImageViewer
    };
    const content = (
      <DescList>
        <DescListItem label="发布时间">
          {formatTimestamp(entry.publishAt, { fromNow: true })}
        </DescListItem>
        {/* <DescListItem label="推荐时间">
          {formatTimestamp(entry.recommendAt, { fromNow: true })}
        </DescListItem> */}
        <DescListItem label="删除时间">
          {formatTimestamp(entry.removeAt, { fromNow: true })}
        </DescListItem>
        <DescListItem label="创建时间">
          {formatTimestamp(entry.createAt, { fromNow: true })}
        </DescListItem>
      </DescList>
    );
    const action = (
      <Fragment>
        <SwitchButton
          status={!entry.publishAt}
          yesLabel="发布"
          yesType="primary"
          noLabel="冻结"
          onYesClick={com.publishEntry}
          onNoClick={com.blockEntry}
        />
        {!entry.publishAt && (
          <Button onClick={com.openTimingPublishModal}>
            定时发布
          </Button>
        )}
        <SwitchButton
          status={!entry.recommendAt}
          yesLabel="推荐"
          noLabel="取消推荐"
          onYesClick={com.recommendEntry}
          onNoClick={com.supplantEntry}
        />
        {!entry.recommendAt && (
          <Button onClick={com.openTimingRecommendModal}>
            定时推荐
          </Button>
        )}
        <SwitchButton
          status={!entry.removeAt}
          yesType="danger"
          yesLabel="删除"
          noType="default"
          noLabel="恢复"
          onYesClick={com.destroyEntry}
          onNoClick={com.recoverEntry}
        />
      </Fragment>
    );

    assign(args, { title, logo, content, action });
  }

  return args;
};
