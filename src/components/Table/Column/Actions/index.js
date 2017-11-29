import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Popover, Icon } from 'antd';

import styles from './styles.css';

export default class TableActionsColumn extends PureComponent {
  static propTypes = {
    moreLabel: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,

    moreContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,

    moreIcon: PropTypes.string.isRequired
  };

  static defaultProps = {
    moreLabel: '更多',
    moreIcon: 'down'
  };

  state = {
    visible: false
  };

  onVisibleChange = visible => {
    this.setState({ visible });
  }

  render() {
    const { children, moreLabel, moreIcon, moreContent } = this.props;
    const { visible } = this.state;

    return (
      <ul className={styles.actions}>
        {children && <li>{children}</li>}

        {/* 更多 */}
        <li>
          <Popover
            overlayClassName={styles.popover}
            trigger="click"
            visible={visible}
            onVisibleChange={this.onVisibleChange}
            content={moreContent}
            placement="bottomRight"
          >
            <a href="javascript:;">
              {moreLabel} <Icon type={moreIcon} />
            </a>
          </Popover>
        </li>
      </ul>
    );
  }
}
