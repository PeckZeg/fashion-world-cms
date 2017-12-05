import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Breadcrumb, Icon } from 'antd';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';

import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import { breadcrumbRoutes, breadcrumbIndexRoutes } from '~/src/const/siders';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import lazyLoadImage from '~/src/utils/lazyLoadImage';
import injectProto from '~/src/utils/injectProto';
import mounted from '~/src/utils/component/mounted';

import styles from './styles.css';

@withRouter
@mounted
@injectProto('setStateAsync')
export default class PageHeader extends PureComponent {
  static propTypes = {
    logo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        url: PropTypes.string,
        visible: PropTypes.bool,
        qiniu: PropTypes.bool,
        icon: PropTypes.string
      }),
    ])
  };

  state = {
    logo: null
  };

  /**
   *  链接猛击事件处理器
   *  @param {Event} e 事件
   */
  onLinkClick = e => {
    const { location: { pathname }, history } = this.props
    const link = e.target.getAttribute('href');

    e.preventDefault();

    if (pathname !== link) {
      history.push(link);
    }
  }

  /**
   *  渲染子面包屑
   *  @returns {React.Element}
   */
  renderSubBreadcrumb = () => {
    const { route, label } = breadcrumbIndexRoutes[this.props.match.path] || {};

    if (route && label) {
      return (
        <a href={route} onClick={this.onLinkClick}>
          {label}
        </a>
      );
    }
  }

  onLogoClick = e => {
    const { logo } = this.props;

    if (isPlainObject(logo)) {
      const { onClick } = logo;

      if (isFunction(onClick)) {
        e.preventDefault();
        onClick(e);
      }
    }
  }

  logo() {
    let { logo } = this.props;

    if (!logo) {
      return null;
    }

    if (isString(logo)) {
      logo = { url: logo, visible: true };
    }

    const { url, icon = 'picture', visible, qiniu, openable } = logo;

    if (visible) {
      const { logo } = this.state;
      let logoUrl = url;

      if (qiniu) {
        logoUrl = toProcessImage(logoUrl, { w: 64, h: 64 });
      }

      if (logo !== logoUrl) {
        this.loadLogo(logoUrl);
      }

      return (
        <div className={styles.logo}>
          <Icon type={icon} />

          <Animate
            component=""
            transitionName="fade"
            transitionAppear
            transitionLeave={false}
          >
            {logo && (
              openable ? (
                <a href={url} target="_blank" onClick={this.onLogoClick}>
                  <ins style={{ backgroundImage: `url(${logo})` }} />
                </a>
              ) : (
                <ins style={{ backgroundImage: `url(${logo})` }} />
              )
            )}
          </Animate>
        </div>
      );
    }
  }

  loadLogo = async logo => {
    await lazyLoadImage(logo);

    if (this.mounted) {
      await this.setStateAsync({ logo });
    }
  };

  render() {
    const { title, content, match } = this.props;

    return (
      <div className={styles.header}>
        <Breadcrumb className={styles.breadcrumb} >
          <Breadcrumb.Item>
            <a href="/" onClick={this.pushRoute}>
              首页
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {this.renderSubBreadcrumb()}
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            {breadcrumbRoutes[match.path]}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.detail}>
          {this.logo()}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
