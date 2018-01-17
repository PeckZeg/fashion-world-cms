import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Tag } from 'antd';

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import DescList from '@components/DescList';
import CardLayout from '../index';

import toProcessImage from '@util/qiniu/toProcessImage';

const { Item: DescListItem, Definitions: DescDefinitionsItem } = DescList;

/**
 *  视频信息
 *  @class
 */
export default class VideoInfo extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    margin: PropTypes.oneOf(['top', 'bottom']),
    entry: PropTypes.object.isRequired
  };

  render() {
    const { margin, entry } = this.props;

    return (
      <CardLayout margin={margin}>
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

          <DescListItem label="频道" flex>
            <Avatar
              icon="appstore-o"
              size="small"
              shape="square"
              src={toProcessImage(get(entry, 'channel.cover'), { w: 64, h: 64 })}
            />

            {entry.channel ? (
              <Link to={`/channel/${entry.channel._id}`}>
                {entry.channel.name}
              </Link>
            ) : <code>无</code>}
          </DescListItem>

          <DescListItem label="分类" flex>
            <Avatar
              icon="pushpin-o"
              size="small"
              shape="square"
              src={toProcessImage(get(entry, 'category.cover'), { w: 64, h: 64 })}
            />

            {entry.category ? (
              <Link to={`/category/${entry.category._id}`}>
                {entry.category.name}
              </Link>
            ) : <code>无</code>}
          </DescListItem>

          <DescListItem label="清晰度">
            <DescDefinitionsItem value={entry.definitions} />
          </DescListItem>

          <DescListItem label="产地" flex>
            <code>{entry.productionCountry}</code>
          </DescListItem>

          <DescListItem label="版权" flex>
            <code>{entry.rightsOwner}</code>
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

        <DescList title="标签信息" col={1}>
          <DescListItem label="标签">
            {isEmpty(entry.tags) ? '-' : entry.tags.map(tag => (
              <Tag key={tag}>
                {tag}
              </Tag>
            ))}
          </DescListItem>

          <DescListItem label="关键字">
            {isEmpty(entry.keywords) ? '-' : entry.keywords.map(keyword => (
              <Tag key={keyword}>
                {keyword}
              </Tag>
            ))}
          </DescListItem>
        </DescList>
      </CardLayout>
    );
  }
};
