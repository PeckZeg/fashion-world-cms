import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CardLayout from '@layout/CardLayout';
import DescList from '@components/DescList';

const { Item: DescListItem } = DescList;

/**
 *  关于详细信息
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
      <CardLayout>
        <DescList title="基本信息">
          <DescListItem label="编号">
            <code>{entry._id}</code>
          </DescListItem>

          <DescListItem label="名称">
            {entry.name}
          </DescListItem>

          <DescListItem label="值">
            {entry.value}
          </DescListItem>

          <DescListItem label="排序值">
            <code>{entry.priority}</code>
          </DescListItem>
        </DescList>

        {/* <Divider /> */}
      </CardLayout>
    );
  }
};
