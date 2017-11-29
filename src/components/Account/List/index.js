import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import CardLayout from '~/src/components/layouts/CardLayout';
import EntryTable from '~/src/components/layouts/EntryTable';

import removeHistoryListener from '~/src/utils/list/removeHistoryListener';
import addHistoryListener from '~/src/utils/list/addHistoryListener';
import genRowSelection from '~/src/utils/table/genRowSelection';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import onTableChange from '~/src/utils/table/onTableChange';
import genPagination from '~/src/utils/table/genPagination';
import genQueryArgs from '~/src/utils/list/genQueryArgs';
import initState from '~/src/utils/list/initState';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import * as querySchema from './querySchema';
import genColumns from './genColumns';

@withRouter
@connect(mapMyToProps)
@injectApi('account')
export default class List extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, querySchema, {
      entriesProp: 'accounts'
    });
  }

  componentDidMount() {
    addHistoryListener(this, querySchema);
  }

  componentWillUnmount() {
    removeHistoryListener(this);
  }

  fetchEntryList = async (offset, limit) => {
    const { entriesProp } = this.state;
    const query = genQueryArgs(this, offset, limit, querySchema);

    try {
      await this.setStateAsync({ loading: true });
      const {
        total,
        [entriesProp]: entries
      } = await this.fetchAccountList(query);

      await this.setStateAsync({
        total,
        entries,
        loading: false,
        offset: query.offset + 1,
        limit: query.limit,
        columns: genColumns(this, query)
      });
    }

    catch (err) {
      catchError(this, err, { loading: true });
    }
  }

  onTableChange = (...args) => onTableChange(this, ...args, querySchema);
  onRowChange = selectedRowKeys => this.setState({ selectedRowKeys });

  render() {
    const {
      docTitle, total, loading, columns, entries, offset, limit
    } = this.state;

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout>
          <CardLayout>
            <EntryTable
              total={total}
              loading={loading}
              columns={columns}
              dataSource={entries}
              // showHeader={false}
              pagination={genPagination({ total, offset, limit })}
              rowSelection={genRowSelection(this)}
              rowKey="_id"
              onChange={this.onTableChange}
            />
            {/* <pre style={{ margin: 0 }}>
              {JSON.stringify(this.state.entries, null, 2)}
            </pre> */}
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
