import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Divider } from 'antd';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import formatTimestamp from '~/src/utils/formatTimestamp';

import DescListItem from './Item';
import DescList from './index';

export default class ChannelDescList extends PureComponent {
  static propTypes = {
    value: PropTypes.object
  };

  render() {
    const { value: entry } = this.props;

    return !isEmpty(entry) && (
      <Fragment>
        <Divider />
        <DescList title="频道信息" icon="appstore-o">
          <DescListItem label="编号">
            <code>{entry._id}</code>
          </DescListItem>

          <DescListItem label="名称" flex>
            <Avatar
              icon="picture"
              size="small"
              shape="square"
              src={toProcessImage(entry.cover, { w: 64, h: 64 })}
            />
            <Link to={`/channel/${entry._id}`}>
              {entry.name}
            </Link>
          </DescListItem>

          <DescListItem label="排序值">
            {entry.priority}
          </DescListItem>

          <DescListItem label="发布时间">
            {formatTimestamp(entry.publishAt, { fromNow: true })}
          </DescListItem>

          <DescListItem label="删除时间">
            {formatTimestamp(entry.removeAt, { fromNow: true })}
          </DescListItem>

          <DescListItem label="创建时间">
            {formatTimestamp(entry.createAt, { fromNow: true })}
          </DescListItem>
        </DescList>
      </Fragment>
    );
  }
}
