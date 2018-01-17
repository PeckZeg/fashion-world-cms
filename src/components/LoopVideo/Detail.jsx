import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import CardLayout from '@layout/CardLayout';
import DescList from '@components/DescList';

import toProcessImage from '@util/qiniu/toProcessImage';

const { Item: DescListItem } = DescList;
const { VideoInfo } = CardLayout;

/**
 *  循环视频详细信息
 *  @class
 */
export default class Detail extends PureComponent {
  /**
   *  `props` 类型检查
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

    return (
      <Fragment>
        <CardLayout>
          <DescList title="基本信息" col={1}>
            <DescListItem label="标题" flex>
              <Avatar
                icon="picture"
                size="small"
                shape="square"
                src={toProcessImage(entry.cover, { w: 64, h: 64 })}
              />
              <code>{entry.title}</code>
            </DescListItem>

            <DescListItem label="副标题">
              {entry.subtitle}
            </DescListItem>
          </DescList>

          <DescList>
            <DescListItem label="编号">
              <code>{entry._id}</code>
            </DescListItem>

            <DescListItem label="视频编号">
              <code>{entry.videoId}</code>
            </DescListItem>

            <DescListItem label="排序值">
              <code>{entry.priority}</code>
            </DescListItem>
          </DescList>

          <DescList col={1}>
            <DescListItem label="摘要">
              {entry.abstract}
            </DescListItem>

            <DescListItem label="简介">
              {entry.summary}
            </DescListItem>
          </DescList>
        </CardLayout>

        <VideoInfo margin="top" entry={entry.video} />
      </Fragment>
    );
  }
}
