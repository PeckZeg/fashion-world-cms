import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';

import UniqKey from '@util/UniqKey';

import styles from './styles.css';

export default class Toolbar extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool
  };

  uniqKeys = new UniqKey();

  render() {
    const { visible, ...props } = this.props

    return (
      <QueueAnim type='bottom' leaveReverse>
        {visible ? (
          <FooterToolbar
            key={this.uniqKeys.key('footerToolbar')}
            className={styles.container}
            {...props}
          />
        ) : null}
      </QueueAnim>
    );
  }
}
