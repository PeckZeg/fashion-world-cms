import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';

import filter from 'lodash/filter';
import get from 'lodash/get';

import CardLayout from '@components/layouts/CardLayout';
import DescList from '@components/DescList';

import toProcessImage from '@util/qiniu/toProcessImage';
import { types } from '@const/banner/types';

const { Item: DescListItem } = DescList;

/**
 *  横幅栏详细信息
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

  type() {
    const { entry } = this.props;
    const type = filter(types, ({ key }) => key === entry.type)[0];

    if (type) {
      return (
        <Fragment>
          <Icon type={type.icon} />
          {type.label}
        </Fragment>
      );
    }

    return '-';
  }

  valueLabel() {
    const { entry } = this.props;

    switch (entry.type) {
      case 'URL':
        return '跳转链接';

      case 'GOTO_VIDEO_PROFILE':
        return '跳转视频';

      default:
        return '跳转值';
    }
  }

  value() {
    const { entry } = this.props;

    switch (entry.type) {
      case 'URL':
        return (
          <code>
            <a href={entry.value.url} target="_blank">
              {entry.value.url}
            </a>
          </code>
        );

      case 'GOTO_VIDEO_PROFILE':
        return (
          <Fragment>
            <Avatar
              icon="appstore-o"
              size="small"
              shape="square"
              src={toProcessImage(get(entry, 'video.cover'), { w: 64, h: 64 })}
            />
            <code>
              {entry.video ? (
                <Link to={`/video/${entry.video._id}`}>
                  {entry.video.title}
                </Link>
              ) : '-'}
            </code>
          </Fragment>
        );

      default:
        return '-';
    }
  }

  render() {
    const { entry } = this.props;

    return (
      <CardLayout>
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

          <DescListItem label="跳转类型">
            {this.type()}
          </DescListItem>

          <DescListItem label={this.valueLabel()} flex>
            {this.value()}
          </DescListItem>

          <DescListItem label="排序值">
            {entry.priority}
          </DescListItem>
        </DescList>

        <DescList col={1}>
          <DescListItem label="标题" flex>
            <Avatar
              icon="pushpin-o"
              size="small"
              shape="square"
              src={toProcessImage(entry.cover, { w: 64, h: 64 })}
            />
            <code>{entry.title}</code>
          </DescListItem>

          <DescListItem label="描述">
            {entry.description || '-'}
          </DescListItem>

        </DescList>
      </CardLayout>
    );
  }
};
