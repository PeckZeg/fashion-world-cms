import React, { PureComponent } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import padStart from 'lodash/padStart';
import isDate from 'lodash/isDate';

import styles from './styles.css';

export default class CountDown extends PureComponent {
  constructor(props) {
    super(props);

    const { lastTime } = this.initTime(props);

    this.state = { lastTime };
  }

  timer = 0;
  interval = 1000;

  componentDidMount() {
    this.tick();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.target !== nextProps.target) {
      clearTimeout(this.timer);
      const { lastTime } = this.initTime(nextProps);
      this.setState({ lastTime }, () => {
        this.tick();
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  tick = () => {
    const { onTick, onEnd } = this.props;
    let { lastTime } = this.state;

    this.timer = setTimeout(() => {
      if (lastTime < this.interval) {
        clearTimeout(this.timer);
        this.setState({ lastTime: 0 }, () => {
          if (onEnd) {
            onEnd();
          }
        });
      }

      else {
        lastTime -= this.interval;
        this.setState({ lastTime }, () => {
          this.tick();

          if (onTick) {
            onTick(this.state.lastTime);
          }
        });
      }
    }, this.interval);
  }

  initTime = props => {
    let lastTime = 0;
    let targetTime = 0;

    try {
      if (isDate(props.target) || moment.isMoment(props.target)) {
        targetTime = +props.target;
      }

      else {
        targetTime = +new Date(props.target);
      }
    }

    catch (err) {
      throw new Error('invalid target prop', err);
    }

    lastTime = targetTime - (+new Date());

    return { lastTime };
  }

  defaultFormat = time => {
    const duration = moment.duration(time);
    const hours = padStart(duration.hours(), 2, '0');
    const minutes = padStart(duration.minutes(), 2, '0');
    const seconds = padStart(duration.seconds(), 2, '0');

    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }

  render() {
    const { className, format = this.defaultFormat, ...rest } = this.props;
    const { lastTime } = this.state;
    const result = format(lastTime);

    return (
      <div className={classnames(styles.countdown, className)} {...rest}>
        {result}
      </div>
    );
  }
};
