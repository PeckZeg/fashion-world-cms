import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

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
    const { children, loading, ...restProps } = this.props;
    const { fixed } = this.state;

    return (
      <div className={styles.container}>
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
        )}

        <GlobalFooter
          className={classnames(styles.globalFooter, { fixed })}
          copyright={copyright}
        />
      </div>
    );
  }
}
