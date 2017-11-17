import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

import * as config from '~/src/const/config';
import styles from './styles.css';

export default class BaseLayout extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <img src={config.logo} alt="" />
            <h1>
              {config.title}
            </h1>
          </div>
          <p className={styles.desc}>
            {config.desc}
          </p>
        </div>

        {this.props.children}

        <GlobalFooter
          className={styles.globalFooter}
          copyright={(
            <div>
              Copyright <Icon type="copyright" /> 2017 {config.copyright}
            </div>
          )}
        />
      </div>
    );
  }
}
