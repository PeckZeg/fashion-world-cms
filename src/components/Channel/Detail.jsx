import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import CardLayout from '~/src/components/layouts/CardLayout';
import DescList from '~/src/components/DescList';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';

const { Item: DescListItem } = DescList;

/**
 *  频道详情页
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

  render() {
    const { entry } = this.props;

    return (
      <CardLayout>
        <DescList title="基本信息">
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
            <code>{entry.name}</code>
          </DescListItem>

          <DescListItem label="排序值">
            <code>{entry.priority}</code>
          </DescListItem>
        </DescList>

        {/* <Divider /> */}
      </CardLayout>
    );
  }
}
