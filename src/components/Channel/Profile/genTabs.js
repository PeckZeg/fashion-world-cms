export default function(com, location, match) {
  location = location || com.props.location;
  match = match || com.props.match;

  const { pathname: defaultTab } = location;
  let tabList = { defaultTab, tabs: [] };

  if (match) {
    const { params: { channelId } } = match;

    tabList.tabs = [
      {
        key: `/channel/${channelId}`,
        tab: '详情'
      },
      {
        key: `/channel/${channelId}/edit`,
        tab: '编辑'
      }
    ];
  }

  return tabList;
};
