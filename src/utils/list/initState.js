import getBaseQuery from '~/src/utils/getBaseQuery';
import parseQuery from '~/src/utils/query/parse';

import { docTitlesByRoute } from '~/src/const/siders';

/**
 *  初始化组件 `state`
 *  @param {React.Component} com 当前组件
 *  @param {object} props 属性字典
 *  @param {object} querySchema 查询模型
 *  @param {object} {extraState} 额外的 `state`
 */
export default function(com, props, querySchema, extraState) {
  const { location, match } = props;
  const { offset, limit } = parseQuery(location.search, querySchema);
  const baseQuery = getBaseQuery(match.path);
  const docTitle = docTitlesByRoute[match.path];

  com.state = {
    docTitle,                  // 文档标题
    historyListener: null,     // 历史记录监听器
    baseQuery,                 // 基本查询对象
    offset,                    // 页面位移
    limit,                     // 每页条数
    total: 0,                  // 记录总数
    loading: true,             // 加载状态
    tableLoading: false,       // 表格加载状态
    columns: [],               // 表格栏
    entries: [],               // 记录列表
    selectedRowKeys: [],       // 已选择行键
    ...extraState              // 扩展对象
  };
};
