import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import React, { Fragment, PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import { Spin } from 'antd';

import PageHeader from '~/src/components/layouts/PageHeader';
import UniqKey from '~/src/utils/UniqKey';

import mounted from '~/src/utils/component/mounted';
import injectProto from '~/src/utils/injectProto';
import { copyright } from '~/src/const/config';

import styles from './styles.css';

/**
 *  附带页头的页面布局
 *  @class
 */
 @mounted
 @injectProto('ref')
export default class PageHeaderLayout extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      fixed: false
    };

    this.uniqKey = new UniqKey();
  }

  componentDidMount() {
    this.$container = ReactDOM.findDOMNode(this);
    this.watcher = requestAnimationFrame(this.onContainerChange);
  }

  componentDidUpdate(prevProps) {
    const { children: prevChildren } = prevProps;
    const { children } = this.props;

    if (prevChildren !== children) {
      this.$container = ReactDOM.findDOMNode(this);
    }
  }

  /**
   *  容器内容高度变化处理器
   */
  onContainerChange = () => {
    cancelAnimationFrame(this.watcher);

    if (this.mounted) {
      const { lastScrollHeight } = this;
      const { scrollHeight } = this.$container;

      if (lastScrollHeight !== scrollHeight) {
        this.setState({
          fixed: scrollHeight + 128 < window.innerHeight
        });
      }

      this.lastScrollHeight = scrollHeight;
    }

    this.watcher = requestAnimationFrame(this.onContainerChange);
  }

  render() {
    const { children, loading, exception, ...restProps } = this.props;
    const { fixed } = this.state;
    const { uniqKey } = this;

    return (
      <div className={classnames(styles.container, {
          [styles.exception]: exception
        })}
      >
        {exception ? exception : (
          <Animate
            component=""
            transitionName="fade"
            transitionAppear
            transitionLeave={false}
          >
            {loading ? (
              <div
                key={uniqKey.key('loading')}
                className={styles.loading}
              >
                <Spin />
              </div>
            ): (
              <Fragment>
                <PageHeader
                  key={uniqKey.key('page-header')}
                  {...restProps}
                />

                {children ? (
                  <div
                    key={uniqKey.key('children')}
                    className={styles.content}
                  >
                    {children}
                  </div>
                ) : null}
              </Fragment>
            )}
          </Animate>
        )}

        <GlobalFooter
          className={classnames(styles.globalFooter, { fixed })}
          copyright={copyright}
        />
      </div>
    );
  }
}
