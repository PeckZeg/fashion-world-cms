import { Button } from 'antd';
import React from 'react';

import Toolbar from '@table/Toolbar';

/**
 *  生成工具栏
 *  @param {React.Component} com 当前组件实例
 *  @returns {React.Component}
 */
export default function(com) {
  const { selectedRowKeys } = com.state;
  const count = selectedRowKeys.length;

  return (
    <Toolbar
      visible={!!count}
      extra={`已选择 ${count} 个项目`}
    >
      <Button type="primary" onClick={com.publishEntries}>发布</Button>
      <Button onClick={com.recommendEntries}>推荐</Button>
      <Button type="danger" onClick={com.blockEntries}>冻结</Button>
      <Button type="danger" onClick={com.supplantEntries}>取消推荐</Button>
      <Button type="default" onClick={com.recoverEntries}>恢复</Button>
      <Button type="danger" onClick={com.destroyEntries}>删除</Button>
      <Button onClick={com.onEmptyRowKeys}>取消</Button>
    </Toolbar>
  );
};
