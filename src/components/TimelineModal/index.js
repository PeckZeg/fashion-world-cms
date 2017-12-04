import { Button, Modal, Timeline } from 'antd';
import injectProto from '~/src/utils/injectProto';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Item from './Item';
import createItem from './createItem';

import styles from './styles.css';

@injectProto('setStateAsync')
export default class TimelineModal extends PureComponent {
  static Item = Item;
  static createItem = createItem;

  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ])
  };

  state = {
    visible: false,
    // maskClosable: false,
    closable: true,
    loading: false
  };

  onClose = () => this.setState(prevState => ({
    visible: prevState.closable ? false : prevState.visible
  }));

  render() {
    const { title, children } = this.props;
    const { visible, closable, loading } = this.state;

    const footer = (
      <Button onClick={this.onClose} disabled={!closable} loading={loading}>
        关闭
      </Button>
    );

    return (
      <Modal
        title={title}
        footer={footer}
        visible={visible}
        onCancel={this.onClose}
      >
        <Timeline className={styles.timeline}>
          {children}
        </Timeline>
      </Modal>
    );
  }
}
