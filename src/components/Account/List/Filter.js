import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Input } from 'antd'

import parseQuery from '~/src/utils/query/parse';
import stringifyQuery from '~/src/utils/query/stringify';

@withRouter
export default class Filter extends PureComponent {
  onSearchName = searchName => {
    const { location, history, match } = this.props;
    const { search: prevSearch } = location;
    const search = stringifyQuery({
      ...parseQuery(prevSearch),
      searchName,
      ...searchName ? { offset: null, limit: null } : null
    });

    if (prevSearch !== search) {
      history.push(`${match.url}${search}`);
    }
  }

  render() {
    const query = parseQuery(this.props.location.search);
    const { searchName } = query;

    return (
      <Fragment>
        <Input.Search
          style={{ width: 256 }}
          defaultValue={searchName}
          placeholder="搜索登录名"
          onSearch={this.onSearchName}
        />
      </Fragment>
    );
  }
}
