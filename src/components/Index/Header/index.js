import { Link, NavLink } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Icon } from 'antd';

import MyAvatar from './MyAvatar';

import styles from '../styles.css';

@withRouter
export default class Header extends PureComponent {
  render() {
    return (
      <div className={styles.right}>
        <NavLink
          className={styles.linkAction}
          to="/changelog"
          activeClassName="active"
          location={this.props.location}
        >
          <Icon type="coffee" />
          更新文档
        </NavLink>

        {process.env.NODE_ENV === 'development' && (
          <div className={styles.action}>
            <Link to="/docs">
              <Icon type="api" />
              文档
            </Link>
          </div>
        )}

        <MyAvatar />
      </div>
    );
  }
}
