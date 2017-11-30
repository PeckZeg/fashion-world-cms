import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import { Icon } from 'antd';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import lazyLoadImage from '~/src/utils/lazyLoadImage';
import injectProto from '~/src/utils/injectProto';

import styles from './styles.css';

@injectProto('setStateAsync')
export default class TableCoverColumn extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    circular: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    icon: 'picture',
    circular: false
  };

  state = {
    cover: null
  };

  componentDidMount() {
    this.loadCover();
  }

  loadCover = async () => {
    const { value } = this.props;

    try {
      if (value) {
        const cover = toProcessImage(value, { w: 64, h: 64, interlace: 1 });

        await lazyLoadImage(cover);
        this.setState({ cover });
      }
    }

    catch (err) {
      console.error(err);
    }
  }

  render() {
    const { icon, circular } = this.props;
    const { cover } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={classnames(styles.container, { circular })}>
          <Animate component="" transitionName="fade" transitionAppear>
            {cover ? (
              <a
                component=""
                className={styles.image}
                key="1"
                href="javascript:;"
                style={{ backgroundImage: `url(${cover})` }}
              >
                <Icon className={styles.zoomIn} type="search" />
              </a>
            ) : null}
          </Animate>
          <Icon className={styles.placeholder} type={icon} />
        </div>
      </div>
    );
  }
}
