import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import { Icon } from 'antd';

import isFunction from 'lodash/isFunction';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import lazyLoadImage from '~/src/utils/lazyLoadImage';
import injectProto from '~/src/utils/injectProto';

import styles from './styles.css';

/**
 *  表格封面栏
 *  @class
 */
@injectProto('setStateAsync')
export default class TableCoverColumn extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    circular: PropTypes.bool,
    value: PropTypes.string,
    preview: PropTypes.object,
    onClick: PropTypes.func
  };

  static defaultProps = {
    icon: 'picture',
    circular: false,
    preview: { w: 80, h: 80 }
  };

  state = {
    cover: null
  };

  componentDidMount() {
    this.loadCover();
  }

  /**
   *  加载封面
   */
  loadCover = async () => {
    const { value, preview } = this.props;

    try {
      if (value) {
        const cover = toProcessImage(value, {
          ...preview,
          interlace: 1
        });

        await lazyLoadImage(cover);
        this.setState({ cover });
      }
    }

    catch (err) {
      console.error(err);
    }
  }

  onClick = e => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      e.preventDefault();
      onClick();
    }
  }

  render() {
    const { icon, circular, value } = this.props;
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
                href={value || 'javascript:;'}
                target="_blank"
                style={{ backgroundImage: `url(${cover})` }}
                onClick={this.onClick}
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
