import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import React, { PureComponent, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import { Spin } from 'antd';

import uniqueId from 'lodash/uniqueId';
import throttle from 'lodash/throttle';

import PageHeader from '~/src/components/layouts/PageHeader';

import injectProto from '~/src/utils/injectProto';
import { copyright } from '~/src/const/config';

import styles from './styles.css';

/**
 *  附带页头的页面布局
 *  @class
 */
 @injectProto('ref')
export default class PageHeaderLayout extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      fixed: false,
      resizeHandler: throttle(() => this.autoFixed(), 150)
    };
  }

  componentDidMount() {
    this.autoFixed();

    window.addEventListener('resize', this.state.resizeHandler);
  }

  componentDidUpdate(prevProps) {
    const { loading: prevLoading } = prevProps;
    const { loading } = this.props;

    if (prevLoading !== loading) {
      this.autoFixed();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.resize);
  }

  autoFixed() {
    const container = ReactDOM.findDOMNode(this);
    const footer = container.querySelector(`.${styles.globalFooter}`);
    let height = container.offsetHeight + 64;
    if (footer) {
      const styles = getComputedStyle(footer);

      height += parseInt(styles.marginTop) + parseInt(styles.marginBottom);
    }

    this.setState({ fixed: height < window.innerHeight });
  }

  render() {
    const { children, loading, exception, ...restProps } = this.props;
    const { fixed } = this.state;

    return exception ? (
      <div className={styles.exception}>
        {exception}
        <GlobalFooter
          className={styles.globalFooter}
          copyright={copyright}
        />
      </div>
    ) : (
      <div className={styles.container}>
        <Animate
          component=""
          transitionName="fade"
          transitionAppear
          transitionLeave={false}
        >
          {loading ? (
            <div className={styles.loading} key={uniqueId('animate')}>
              <Spin />
            </div>
          ): (
            <Fragment key={uniqueId('animate')}>
              <PageHeader {...restProps} />
              {children ? (
                <div className={styles.content}>
                  {children}
                </div>
              ) : null}
            </Fragment>
          )}
        </Animate>
        {/*
        {!loading && <PageHeader {...restProps} />}

        {loading ? (
          <div className={styles.loading}>
            <Spin />
          </div>
        ) : (
          children ? (
            <div className={styles.content}>
              {children}
            </div>
          ) : null
        )} */}

        <GlobalFooter
          className={classnames(styles.globalFooter, { fixed })}
          copyright={copyright}
        />
      </div>
    );
  }
}
