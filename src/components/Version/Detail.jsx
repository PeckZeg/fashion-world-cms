import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import CardLayout from '@layout/CardLayout';
import DescList from '@components/DescList';

import toProcessImage from '@util/qiniu/toProcessImage';
import { version as icon } from '@const/icons';

const { Item: DescListItem } = DescList;

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
      <CardLayout>
        <DescList>
          <DescListItem label="编号">
            <code>{entry._id}</code>
          </DescListItem>

          <DescListItem label="更新平台">
            <code>{entry.type}</code>
          </DescListItem>

          <DescListItem label="更新版本">
            <code>{entry.version}</code>
          </DescListItem>
        </DescList>

        <DescList col={1}>
          <DescListItem label="链接" flex>
            <code>
              <a href={entry.link} target="_blank">
                {entry.link}
              </a>
            </code>
          </DescListItem>

          <DescListItem label="标题" flex>
            <Avatar
              icon={icon}
              size="small"
              shape="square"
              src={toProcessImage(entry.cover, { w: 64, h: 64 })}
            />
            {entry.title}
          </DescListItem>

          <DescListItem label="描述">
            {entry.description}
          </DescListItem>
        </DescList>
      </CardLayout>
    );
  }
};
