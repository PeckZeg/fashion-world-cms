import React, { PureComponent } from 'react';
import { Tag } from 'antd';

import upperCase from 'lodash/upperCase';

export default class MethodTag extends PureComponent {
  color() {
    switch (upperCase(this.props.value)) {
      case 'GET':
        return 'green';

      case 'POST':
        return 'orange';

      case 'PUT':
        return 'blue';

      case 'DEL':
      case 'DELETE':
        return 'red';

      default:
        // ...
    }
  }

  render() {
    const { value } = this.props;

    return (
      <Tag color={this.color()}>
        {upperCase(value)}
      </Tag>
    );
  }
}
