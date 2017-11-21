import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import MyAvatar from './MyAvatar';

import styles from '../styles.css';

export default class Header extends PureComponent {
  render() {
    return (
      <div className={styles.right}>
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
