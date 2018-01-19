import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'antd';

@withRouter
export default class LinkAction extends PureComponent {
  onClick = e => {
    e.preventDefault();
    this.props.history.push(this.props.to);
  }

  render() {
    const { children, icon, to } = this.props;

    return (
      <li>
        <Button icon={icon} href={to} onClick={this.onClick}>
          {children}
        </Button>
      </li>
    );
  }
}
