import React, { PureComponent } from 'react';
import Animate from 'rc-animate';
import moment from 'moment';
import Push from 'push.js';

import padStart from 'lodash/padStart';
import sample from 'lodash/sample';

import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import CountDown from './CountDown';

import { copyright } from '@const/config';
import styles from './styles.css';

const icons = [
  'http://beta.images.fashionworldcn.com/1ba12cbe8dbd23843febef41d8eabb97d8f32529.jpg',
  'http://beta.images.fashionworldcn.com/6aa3dee67fdff103d0bf041e6e6ee2561fbbdd3e.jpeg',
  'http://beta.images.fashionworldcn.com/259c3365cb2980dcf270c2c7fa7f0e137b6ce510.jpeg'
];

export default class ClockOffCountDown extends PureComponent {
  constructor(props) {
    super(props);

    const now = moment();
    const start = now.clone().hour(9).startOf('hour');
    const end = now.clone().hour(18).startOf('hour');
    let status = 'breaking';

    if (now.isBetween(start, end)) {
      status = 'working';
    }

    this.state = {
      status
    };
  }

  onTick = lastTime => {
    const duration = moment.duration(lastTime);
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();

    if (hours && !minutes && !seconds) {
      Push.create(`距离下班还有 ${padStart(hours, 2, '0')} 个小时`, {
        icon: sample(icons)
      });
    }

    else if (!hours && minutes && minutes < 20 && minutes % 5 === 0 &&
              !seconds) {
      minutes = padStart(minutes, 2, '0');

      Push.create(`距离下班仅剩 ${minutes} 分钟`, {
        icon: sample(icons)
      });
    }

    else if (!hours && minutes && minutes < 5 && !seconds) {
      minutes = padStart(minutes, 2, '0');

      Push.create(`距离下班仅剩 ${minutes} 分钟`, {
        icon: sample(icons)
      });
    }

    else if (!hours && !minutes && seconds && seconds % 10 === 0) {
      seconds = padStart(seconds, 2, '0');

      Push.create(`距离下班仅剩 ${seconds} 秒！`, {
        icon: sample(icons)
      });
    }
  }

  onEnd = () => {
    this.setState({ status: 'breaking' });
    Push.create('下班了，公司不欠你一分钱', {
      icon: sample(icons)
    });
  }

  renderContent() {
    switch (this.state.status) {
      case 'working':
        const now = moment();
        const target = now.clone().hour(18).startOf('hour');

        return (
          <div className={styles.content} key="working">
            <h2>
              距离下班

              <small>
                {now.format('YYYY-MM-DD dddd')}
              </small>
            </h2>

            <CountDown
              target={target}
              onTick={this.onTick}
              onEnd={this.onEnd}
            />
          </div>
        );

      case 'breaking':
      default:
        return (
          <h1 key="breaking">
            下班啦！
          </h1>
        );
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <Animate
            component=""
            transitionName="fade"
            transitionAppear
          >
            {this.renderContent()}
          </Animate>
        </div>

        <GlobalFooter
          className={styles.globalFooter}
          copyright={copyright}
        />
      </div>
    );
  }
};
