import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

@withRouter
export default class List extends PureComponent {
  render() {
    return (
      <pre>
        {JSON.stringify(this.props.location, null, 2)}
      </pre>
    );
  }
}
