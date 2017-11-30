import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';

import styles from './styles.css';

export default class Toolbar extends PureComponent {
  render() {
    const { visible, ...props } = this.props

    return (
      <QueueAnim type='bottom' leaveReverse>
        {visible ? (
          <FooterToolbar
            key="a"
            className={styles.container}
            {...props}
          />
        ) : null}
      </QueueAnim>
    );
  }
}
