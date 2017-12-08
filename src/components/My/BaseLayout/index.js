/*global __VERSION__:true, __UPDATE_TIME__:TRUE*/
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Tag } from 'antd';

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
              <Tag color="blue">
                {__VERSION__}
              </Tag>
            </h1>
          </div>
          <p className={styles.desc}>
            {config.desc}
          </p>
          <p className={styles.desc}>
            最后更新：{moment(__UPDATE_TIME__).format('YYYY-MM-DD')}
          </p>
        </div>

        {this.props.children}

        <GlobalFooter
          className={styles.globalFooter}
          copyright={config.copyright}
        />
      </div>
    );
  }
}
