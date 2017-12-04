import { matchPath } from 'react-router';

import isFunction from 'lodash/isFunction';

export default function(com) {
  const { path } = com.props.match
  const { entryIdProp } = com.state;
  ;
  const historyListener = com.props.history.listen(location => {
    const match = matchPath(location.pathname, { path, exact: true });

    if (match) {
      const { params: { [entryIdProp]: entryId } } = match;

      com.setState({ entryId }, () => {
        isFunction(com.fetchEntry) && com.fetchEntry();
      });
    }
  });

  com.setState({ historyListener }, () => {
    isFunction(com.fetchEntry) && com.fetchEntry();
  });
};
