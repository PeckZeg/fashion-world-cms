import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Input } from 'antd';

import FilterLayout from '~/src/components/layouts/FilterLayout';

import stringifyQuery from '~/src/utils/query/stringify';
import injectProto from '~/src/utils/injectProto';
import parseQuery from '~/src/utils/query/parse';

const { SyncButton } = FilterLayout;

@withRouter
@injectProto('setStateAsync')
export default class Filter extends PureComponent {
  state = {
    syncing: false
  };

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
    const { onSync } = this.props;
    const query = parseQuery(this.props.location.search);
    const { searchName } = query;

    return (
      <FilterLayout>
        <Input.Search
          style={{ width: 256 }}
          defaultValue={searchName}
          placeholder="搜索频道名"
          onSearch={this.onSearchName}
        />

        <SyncButton onClick={onSync} />
      </FilterLayout>
    );
  }
}
