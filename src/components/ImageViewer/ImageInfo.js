import React, { PureComponent } from 'react';
import Animate from 'rc-animate';
import filesize from 'filesize';
import { Icon, Spin } from 'antd';

import uniqueId from 'lodash/uniqueId';
import random from 'lodash/random';

import fetchImageInfo from '~/src/utils/qiniu/fetchImageInfo';
import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
import injectProto from '~/src/utils/injectProto';

import styles from './styles.css';

@injectProto('setStateAsync')
export default class ImageInfo extends PureComponent {
  state = {
    loading: true,
    info: null
  };

  componentDidMount() {
    this.fetchInfo();
  }

  componentDidUpdate(prevProps) {
    const { src: prevSrc } = prevProps;
    const { src } = this.props;

    if (prevSrc !== src) {
      this.fetchInfo();
    }
  }

  fetchInfo = async () => {
    try {
      await this.setStateAsync({ info: null, loading: true });
      const info = await fetchImageInfo(this.props.src);
      await setTimeoutAsync(random(128, 512));
      await this.setStateAsync({ info, loading: false });
    }

    catch (err) {
      console.error(err);
    }
  }

  render() {
    const { src } = this.props;
    const { info, loading } = this.state;

    return (
      <div className={styles.imageInfo}>
        <Animate
          component=""
          transitionName="fade"
          transitionAppear
          transitionLeave={false}
        >
          {loading ? (
            <div
              key={uniqueId('animate')}
              className={styles.imageInfoLoading}
            >
              <Spin />
            </div>
          ) : (
            <dl key={uniqueId('animate')}>
              <h4>图片信息</h4>

              <dt>尺寸</dt>
              <dd><code>{info.width}</code> &times; <code>{info.height}</code></dd>

              <dt>大小</dt>
              <dd><code>{filesize(info.size)}</code></dd>

              <dt>格式</dt>
              <dd><code>{info.format}</code></dd>

              <dt>颜色模式</dt>
              <dd><code>{info.colorModel}</code></dd>

              <dd>
                <a href={src} target="_blank">
                  查看原图
                  <Icon type="export" />
                </a>
              </dd>
            </dl>
          )}
        </Animate>
      </div>
    );
  }
}
