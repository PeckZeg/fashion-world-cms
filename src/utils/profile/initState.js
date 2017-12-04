/**
 *  初始化 `state`
 *  @param {React.Component} com
 *  @param {object} props
 *  @param {string} entryIdProp
 *  @param {object} [extraState]
 */
export default function(com, props, entryIdProp, extraState) {
  const { match: { params: { [entryIdProp]: entryId } } } = props;

  com.state = {
    loading: true,             //  加载状态
    entryId,                   //  条目编号
    entry: null,               //  条目
    exception: null,           //  异常
    historyListener: null,     //  历史记录监听器
    entryIdProp,               //  条目编号属性
    ...extraState              //  额外的状态
  };
};
