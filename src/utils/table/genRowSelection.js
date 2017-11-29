/**
 *  生成行选择选项
 *  @param {React.Component} com 组件实例
 *  @param {object} [extra] 额外的配置项
 *  @returns {object} 配置项
 */
export default (com, extra) => ({
  selectedRowKeys: com.state.selectedRowKeys,
  onChange: com.onRowChange,
  hideDefaultSelections: true,
  ...extra
});
