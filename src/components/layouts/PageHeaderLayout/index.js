import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import React, { PureComponent } from 'react';

import PageHeader from '~/src/components/layouts/PageHeader';
import { copyright } from '~/src/const/config';
import styles from './styles.css';

export default class PageHeaderLayout extends PureComponent {
  render() {
    const { children, ...restProps } = this.props;

    return (
      <div className={styles.container}>
        <PageHeader {...restProps} />

        {children ? <div className={styles.content}>{children}</div> : null}

        <GlobalFooter className={styles.globalFooter} copyright={copyright} />
      </div>
    );
  }
}
