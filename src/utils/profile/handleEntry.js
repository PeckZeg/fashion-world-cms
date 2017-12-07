import { message } from 'antd';

import isFunction from 'lodash/isFunction';
import random from 'lodash/random';

import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
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
     const { entry, entryProp, entryTitle, entryNameProp = '_id' } = com.state;

     try {
       await button.setStateAsync({ loading: true });
       await setTimeoutAsync(random(512, 1024));

       const { [entryProp]: newEntry } = await com[handleName](entry._id);

       await com.setStateAsync({ entry: newEntry });
       await button.setStateAsync({ loading: false });
       message.success(`${prefix}${entryTitle} ${newEntry[entryNameProp]} 成功`);
     }

     catch (err) {
       catchError(button, err, {
         message: `${prefix}${entryTitle} ${entry[entryNameProp]} 失败`,
         loading: true
       });
     }
   }
 };
