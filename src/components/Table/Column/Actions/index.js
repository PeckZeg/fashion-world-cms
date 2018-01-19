import React, { PureComponent } from 'react';
import { Popover, Icon } from 'antd';
import PropTypes from 'prop-types'

import SwitchAction from './SwitchAction';
import LinkAction from './LinkAction';
import EditLink from './EditLink';
import Action from './Action';

import styles from './styles.css';

/**
 *  表格动作栏
 *  @class
 */
export default class TableActionsColumn extends PureComponent {
  static SwitchAction = SwitchAction;
  static LinkAction = LinkAction;
  static EditLink = EditLink;
  static Action = Action;

  static propTypes = {
    moreLabel: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,

    moreContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),

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
        {moreContent && (
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
        )}
      </ul>
    );
  }
}
