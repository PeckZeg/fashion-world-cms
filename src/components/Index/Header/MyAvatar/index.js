import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Avatar, Popover } from 'antd';
import classnames from 'classnames';

import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import Menu from './Menu';

import styles from '../../styles.css';

@connect(mapMyToProps)
export default class Header extends PureComponent {
  render() {
    const { profile: account } = this.props.my;

    return (
      <div className={classnames([styles.action, styles.avatarAction])}>
        <Popover
          overlayClassName={styles.avatarPopover}
          content={<Menu />}
          placement="bottomRight"
          trigger="click"
          arrowPointAtCenter={true}
          // visible
        >
          <Avatar icon="user" src={account.avatar} />
          {account.name}
        </Popover>
      </div>
    );
  }
}
