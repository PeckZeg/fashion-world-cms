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
    const { params: { videoId } } = match;

    tabList.tabs = [
      {
        key: `/video/${videoId}`,
        tab: '详情'
      },
      {
        key: `/video/${videoId}/player`,
        tab: '视频预览'
      },
      {
        key: `/video/${videoId}/avinfo`,
        tab: '视频元信息'
      },
      {
        key: `/video/${videoId}/edit`,
        tab: '编辑'
      },
      {
        key: `/video/${videoId}/edit/subtitle-files`,
        tab: '编辑字幕文件',
        disabled: true
      }
    ];
  }

  return tabList;
};
