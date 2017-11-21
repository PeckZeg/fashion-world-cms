import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

@withRouter
export default class ComponentPage extends PureComponent {
  render() {
    return (
      <pre>
        {JSON.stringify(this.props.location)}
      </pre>
    );
  }
}
