import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';

import DescList from '@components/DescList';

import toProcessImage from '@util/qiniu/toProcessImage';
import * as icons from '@const/icons';

const { Item: DescListItem } = DescList;

export default function(com, type, opts = {}) {
  switch (type) {
    case 'success':
      const { entry } = opts;

      return {
        type,
        title: `创建分类「${entry.name}」成功`,
        description: '创建的分类默认为未使用的状态，请手动开启',
        extra: (
          <DescList col={1}>
            <DescListItem label="频道" flex>
              <Avatar
                icon={icons.channel}
                size="small"
                shape="square"
                src={toProcessImage(entry.channel.cover, { w: 64, h: 64 })}
              />
              <Link to={`/channel/${entry.channelId}`}>
                {entry.channel.name}
              </Link>
            </DescListItem>

            <DescListItem label="名称" flex>
              <Avatar
                icon={icons.category}
                size="small"
                shape="square"
                src={toProcessImage(entry.cover, { w: 64, h: 64 })}
              />
              <Link to={`/category/${entry._id}`}>
                {entry.name}
              </Link>
            </DescListItem>

            <DescListItem label="排序值">
              {entry.priority}
            </DescListItem>
          </DescList>
        ),
        actions: (
          <Fragment>
            <Button
              type="primary"
              onClick={com.pushState.bind(com, '/categories')}
            >
              返回所有分类
            </Button>
            <Button
              onClick={com.pushState.bind(com, `/category/${entry._id}`)}
            >
              查看分类
            </Button>
          </Fragment>
        )
      };

    case 'error':
    default:
      const { err } = opts;

      return {
        type,
        title: '创建失败',
        description: `原因：${err.message}`,
        actions: (
          <Fragment>
            <Button
              type="primary"
              onClick={com.pushState.bind(com, '/categories')}
            >
              返回所有分类
            </Button>
            <Button onClick={com.backToForm}>
              重新创建
            </Button>
          </Fragment>
        )
      };
  }
};
