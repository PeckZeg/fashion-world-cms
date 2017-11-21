import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

@withRouter
export default class ComponentPage extends PureComponent {
  render() {
    return (
      <pre style={{ padding: '1.75em' }}>
        {JSON.stringify(this.props.location, null, 2)}
      </pre>
    );
  }
}
