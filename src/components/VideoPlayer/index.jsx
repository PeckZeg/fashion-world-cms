import React, { PureComponent } from 'react';
import ReactPlayer from 'react-player';
import { Icon, Spin, Slider } from 'antd';
import Animate from 'rc-animate';
import classnames from 'classnames';
import moment from 'moment';

import random from 'lodash/random';

import CardLayout from '@layout/CardLayout';
import UniqKey from '@util/UniqKey';

import setTimeoutAsync from '@util/setTimeoutAsync';
import formatDuration from '@util/formatDuration';
import injectProto from '@util/injectProto';
import { logo } from '@const/config';
import styles from './styles.css';

/**
 *  视频播放器
 *  @class
 */
@injectProto('setStateAsync', 'ref')
export default class VideoPlayer extends PureComponent {
  state = {
    spinning: true,
    playing: false,
    played: 0,
    loaded: 0
  };

  uniqKey = new UniqKey();

  /**
   *  播放就绪事件处理器
   *  @this 当前组件实例
   *  @returns {Promise}
   */
  onReady = async () => {
    await setTimeoutAsync(random(128, 1024));
    await this.setStateAsync({ spinning: false });
  }

  /**
   *  播放进度事件处理器
   *  @this 当前组件实例
   */
  onProgress = ({ loadedSeconds: loaded, playedSeconds: played }) => {
    this.setState({ loaded, played });
  }

  /**
   *  接收视频播放时长事件处理器
   *  @this 当前组件实例
   */
  onDuration = duration => this.setState({ duration });

  /**
   *  进度条滑动事件处理器
   *  @this 当前组件实例
   */
  onSlide = played => {
    this.setState({ played });
    this.player.seekTo(played / this.state.duration);
  }

  /**
   *  切换播放按钮事件处理器
   *  @this 当前组件实例
   */
  onTogglePlay = () => this.setState(({ playing }) => ({ playing: !playing }));

  /**
   *  滑块提示格式器
   *  @this 当前组件实例
   *  @param {number} value
   *  @returns {string}
   */
  _sliderTipFormatter = value => (
    formatDuration(moment.duration(value, 's'))
  );

  /**
   *  已播放时长
   *  @returns {string}
   */
  _played() {
    return formatDuration(moment.duration(this.state.played, 's'));
  }

  /**
   *  视频播放时长
   *  @returns {string}
   */
  _duration() {
    return formatDuration(moment.duration(this.state.duration, 's'));
  }

  render() {
    const { url } = this.props;
    const { spinning, playing, duration, played } = this.state;
    const { uniqKey } = this;

    return (
      <CardLayout className={styles.card} margin="bottom">
        <div className={styles.main}>
          <div className={styles.player}>
            <Animate
              component=""
              transitionName="fade"
            >
              {spinning ? (
                <Spin key={uniqKey.key('spin')} className={styles.spinning} />
              ) : null}
            </Animate>

            <div className={styles.reactPlayer}>
              <div
                className={classnames(styles.pauseMask, { active: !playing })}
                onClick={this.onTogglePlay}
              >
                <div className={styles.pauseIcon}>
                  <img src={logo} alt="" />
                </div>
              </div>

              <ReactPlayer
                ref={this.ref.bind(this, 'player')}
                url={url}
                width={null}
                height={null}
                playing={playing}
                onReady={this.onReady}
                onDuration={this.onDuration}
                onProgress={this.onProgress}
              />
            </div>

            <div className={styles.toolbar}>
              <div
                className={styles.toggleButton}
                onClick={this.onTogglePlay}
              >
                <Icon type={playing ? 'pause' : 'caret-right'} />
              </div>

              <div className={styles.progressbar}>
                <div className={styles.slider}>
                  <Slider
                    min={0}
                    max={duration}
                    step={0.001}
                    value={played}
                    tipFormatter={this._sliderTipFormatter}
                    onChange={this.onSlide}
                  />
                </div>
              </div>

              <div className={styles.time}>
                <strong>{this._played()}</strong>
                <small>{this._duration()}</small>
              </div>
            </div>
          </div>


          <div className={styles.aside} />
        </div>
      </CardLayout>
    );
  }
}
