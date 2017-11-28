import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import { Card } from 'antd';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import CardLayout from '~/src/components/layouts/CardLayout';

import removeHistoryListener from '~/src/utils/list/removeHistoryListener';
import addHistoryListener from '~/src/utils/list/addHistoryListener';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import genQueryArgs from '~/src/utils/list/genQueryArgs';
import initState from '~/src/utils/list/initState';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import * as querySchema from './querySchema';

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
      });
    }

    catch (err) {
      catchError(this, err, { loading: true });
    }
  }

  render() {
    const { docTitle } = this.state;

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout>
          <CardLayout>
            <pre style={{ margin: 0 }}>
              {JSON.stringify(this.state.entries, null, 2)}
            </pre>
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
