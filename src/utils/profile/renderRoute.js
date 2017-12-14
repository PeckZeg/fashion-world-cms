import React from 'react';

/**
 *  渲染路由
 *  @this {React.Component} 当前组件实例
 *  @param {React.Component} Component 渲染的组件
 *  @returns {ReactNode} 渲染的组件
 */
export default function(Component) {
  const { entry, entryProp, entryTitle, entryNameProp } = this.state;
  const props = { entry, entryProp, entryTitle, entryNameProp };

  return (
    <Component
      {...props}
      onUpdate={this.onUpdate}
    />
  );
};
