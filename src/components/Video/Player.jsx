import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { PureComponent } from 'react';
import { List, Tag, message } from 'antd';
import PropTypes from 'prop-types';

import CardLayout from '@components/layouts/CardLayout';

const { Item: ListItem } = List;

/**
 *  播放器
 *  @class
 */
export default class Player extends PureComponent {
  /**
   *  `props` 的类型检查
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

  /**
   *  复制事件处理器
   *  @this 当前组件实例
   */
  onCopy = () => message.success('已复制');

  render() {
    const { entry } = this.props;
    const { definitions } = entry;

    return (
      <CardLayout>
        <List>
          {definitions.map(({ key, url, definition }) => (
            <ListItem key={key}>
              <CopyToClipboard
                text={url}
                onCopy={this.onCopy}
              >
                <Tag>
                  {definition}
                </Tag>
              </CopyToClipboard>
            </ListItem>
          ))}
        </List>
      </CardLayout>
    );
  }
}
