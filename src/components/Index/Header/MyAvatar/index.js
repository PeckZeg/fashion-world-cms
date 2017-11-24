import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Avatar, Popover } from 'antd';
import classnames from 'classnames';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import Menu from './Menu';

import indexStyles from '../../styles.css';
import styles from './styles.css';

@connect(mapMyToProps)
export default class Header extends PureComponent {
  render() {
    const { profile: account } = this.props.my;
    const { name } = account;
    const avatar = toProcessImage(account.avatar, {
      w: 32,
      h: 32,
      interlace: 1
    });

    return (
      <div className={classnames([
        indexStyles.action,
        indexStyles.avatarAction
      ])}>
        <Popover
          overlayClassName={styles.avatarPopover}
          content={<Menu />}
          placement="bottomRight"
          trigger="click"
          arrowPointAtCenter={true}
          // visible
        >
          <Avatar icon="user" src={avatar} />
          {name}
        </Popover>
      </div>
    );
  }
}
