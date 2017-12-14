/**
 *  生成标签页列表
 *  @param {React.Component} com 当前组件实例
 *  @param {object} [location] 坐标对象
 *  @param {object} [match] 匹配对象
 */
export default function(com, location, match) {
  location = location || com.props.location;
  match = match || com.props.match;

  const { pathname: defaultTab } = location;
  let tabList = { defaultTab, tabs: [] };

  if (match) {
    const { params: { categoryId } } = match;

    tabList.tabs = [
      {
        key: `/category/${categoryId}`,
        tab: '详情'
      },
      {
        key: `/category/${categoryId}/edit`,
        tab: '编辑'
      }
    ];
  }

  return tabList;
};
