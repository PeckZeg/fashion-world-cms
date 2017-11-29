import React, { PureComponent } from 'react';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import CardLayout from '~/src/components/layouts/CardLayout';

export default class AccountProfile extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <CardLayout>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </CardLayout>
      </PageHeaderLayout>
    );
  }
}
