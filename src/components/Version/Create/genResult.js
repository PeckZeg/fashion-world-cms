import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';

import DescList from '@components/DescList';

import toProcessImage from '@util/qiniu/toProcessImage';
import * as icons from '@const/icons';

const { Item: DescListItem } = DescList;

export default function(com, type, opts = {}) {
  const { entryTitle, entryNameProp } = com.state;

  switch (type) {
    case 'success':
      const { entry } = opts;

      return {
        type,
        title: `创建${entryTitle}「${entry[entryNameProp]}」成功`,
        description: `创建的${entryTitle}默认为未使用的状态，请手动开启`,
        extra: (
          <DescList col={1}>
            <DescListItem label="名称" flex>
              <Avatar
                icon={icons.version}
                size="small"
                shape="square"
                src={toProcessImage(entry.cover, { w: 64, h: 64 })}
              />
              <Link to={`/version/${entry._id}`}>
                {entry[entryNameProp]}
              </Link>
            </DescListItem>
          </DescList>
        ),
        actions: (
          <Fragment>
            <Button
              type="primary"
              onClick={com.pushState.bind(com, '/versions')}
            >
              返回所有{entryTitle}
            </Button>
            <Button
              onClick={com.pushState.bind(com, `/version/${entry._id}`)}
            >
              查看{entryTitle}
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
              onClick={com.pushState.bind(com, '/versions')}
            >
              返回所有{entryTitle}
            </Button>
            <Button onClick={com.backToForm}>
              重新创建
            </Button>
          </Fragment>
        )
      };
  }
};
