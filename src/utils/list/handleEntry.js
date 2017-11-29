import { message } from 'antd';

import isFunction from 'lodash/isFunction';
import random from 'lodash/random';

import catchError from '~/src/utils/catchError';

/**
 *  处理条目
 *  @param {React.Component} com 组件实例
 *  @param {React.Component} button 按钮组件实例
 *  @param {string} prefix 前缀
 *  @param {string} handleName 处理方法名
 */
export default async function(com, button, prefix, handleName) {
  if (isFunction(com[handleName])) {
    button.setState({ loading: true }, () => {
      const { entryProp, entryTitle, entryNameProp = '_id' } = com.state;
      const { entry } = button.props;
      let { entries } = com.state;

      setTimeout(async () => {
        try {
          const { [entryProp]: newEntry } = await com[handleName](entry._id);
          const idx = entries.indexOf(entry);

          if (idx > -1) {
            entries.splice(idx, 1, newEntry);
            com.setState({ entries: entries.slice() });
          }

          button.setState({ loading: false });
          message.success(`${prefix}${entryTitle} ${entry[entryNameProp]} 成功`);
        }

        catch (err) {
          catchError(button, err, {
            message: `${prefix}${entryTitle} ${entry[entryNameProp]} 失败`,
            loading: true
          });
        }
      }, random(512, 1024));
    });
  }
};
