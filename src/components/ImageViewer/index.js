import React, { PureComponent, Fragment } from 'react';
import { Avatar, Modal, Spin } from 'antd';
import Animate from 'rc-animate';

import uniqueId from 'lodash/uniqueId';

import ImageInfo from './ImageInfo';
import Title from './Title';

import lazyLoadImage from '~/src/utils/lazyLoadImage';
import injectProto from '~/src/utils/injectProto';

import styles from './styles.css';

@injectProto('setStateAsync')
export default class ImageViewer extends PureComponent {
  static Title = Title;

  state = {
    visible: false,
    loading: true,
    title: null,
    src: null,
  };

  componentDidUpdate() {
    if (this.state.visible) {
      this.loadImage();
    }
  }

  show(src, title) {
    this.setState({ src, title, visible: true });
  }

  loadImage = async () => {
    const { src } = this.state;

    try {
      await lazyLoadImage(src);

      setTimeout(async () => {
        await this.setStateAsync({ loading: false });
      }, 512);
    }

    catch (err) {
      console.error(err);
    }
  }

  /**
   *  关闭处理器
   */
  onClose = () => this.setState({ visible: false });

  afterClose = () => {
    this.setState({ loading: true, title: null, src: null });
  }

  render() {
    const { visible, loading, src, title } = this.state;

    return (
      <Modal
        title={title && <div className={styles.title}>{title}</div>}
        wrapClassName={styles.modal}
        width={null}
        footer={null}
        visible={visible}
        onCancel={this.onClose}
        afterClose={this.afterClose}
      >
        <ImageInfo src={src} />

        <div className={styles.content}>
          <Animate
            component=""
            transitionName="fade"
            transitionAppear
            transitionLeave={false}
          >
            {loading ? (
              <div
                key={uniqueId('animate')}
                className={styles.contentLoading}
              >
                <Spin size="large" />
              </div>
            ) : (
              <div
                key={uniqueId('animate')}
                className={styles.imageViewer}
              >
                <img src={src} alt="" />
              </div>
            )}
          </Animate>
        </div>
      </Modal>
    );
  }
}
