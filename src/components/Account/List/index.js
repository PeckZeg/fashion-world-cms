import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Card } from 'antd';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';

@withRouter
export default class List extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <Card>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(this.props.location, null, 2)}
          </pre>
        </Card>
      </PageHeaderLayout>
    );
  }
}
