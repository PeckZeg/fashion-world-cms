/**
 *  引用组件实例
 *  @param {string} name 绑定名称
 *  @param {*} com 组件引用
 */
export default function (name, com) {
  this[name] = com;
};
