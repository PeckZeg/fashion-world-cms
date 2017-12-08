export default function(com, location, match) {
  location = location || com.props.location;
  match = match || com.props.match;

  const { pathname: defaultTab } = location;
  let tabList = { defaultTab, tabs: [] };

  if (match) {
    const { params: { accountId } } = match;

    tabList.tabs = [
      {
        key: `/account/${accountId}`,
        tab: '详情'
      },
      {
        key: `/account/${accountId}/edit`,
        tab: '编辑'
      },
      {
        key: `/account/${accountId}/avatar`,
        tab: '编辑头像'
      }
    ];
  }

  return tabList;
};
