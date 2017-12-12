import React, { PureComponent } from 'react';
import { Button } from 'antd';

export default class Action extends PureComponent {
  render() {
    const { children, ...buttonProps } = this.props;

    return (
      <li>
        <Button {...buttonProps}>
          {children}
        </Button>
      </li>
    );
  }
}
