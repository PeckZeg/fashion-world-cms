import { Breadcrumb, Icon, Tabs } from 'antd';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import classnames from 'classnames';
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

const { TabPane } = Tabs;

@withRouter
@mounted
@injectProto('setStateAsync')
export default class PageHeader extends PureComponent {
  /**
   *  属性类型
   *  @property {string|object} logo logo 配置项
   *  @property {string} logo.url logo 链接
   *  @property {boolean} logo.visible 是否显示 logo
   *  @property {boolean} logo.qiniu 是否使用七牛图片切割参数
   *  @property {string} [logo.icon = 'picture'] 默认图标
   *  @property {object[]} tabs 标签页
   *  @property {string|ReactNode} tabs[].tab 选项卡头显示文字
   *  @property {string} tabs[].key 对应 activeKey
   *  @property {Function} onLogoClick 猛击 logo 的处理器
   *  @property {Function} onTabChange 猛击标签的处理器
   */
  static propTypes = {
    logo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        url: PropTypes.string,
        visible: PropTypes.bool,
        qiniu: PropTypes.bool,
        icon: PropTypes.string
      }),
    ]),

    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        tab: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element
        ]),
        key: PropTypes.string
      })
    ),

    defaultTab: PropTypes.string,
    // activeTab: PropTypes.string,

    onLogoClick: PropTypes.func,
    onTabChange: PropTypes.func
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
   *  Logo 猛击事件处理器
   *  @param {Event} e
   */
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

  /**
   *  标签切换处理器
   *  @param {string} key
   */
  onTabChange = key => {
    if (isFunction(this.props.onTabChange)) {
      this.props.onTabChange(key);
    }
  };

  /**
   *  加载 Logo
   *  @param {string} logo
   */
  loadLogo = async logo => {
    await lazyLoadImage(logo);

    if (this.mounted) {
      await this.setStateAsync({ logo });
    }
  };

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

  /**
   *  渲染 Logo
   *  @returns {React.Component}
   */
  renderLogo() {
    let { logo } = this.props;

    if (!logo) {
      return null;
    }

    if (isString(logo)) {
      logo = { url: logo, visible: true };
    }

    const { url, icon = 'picture', visible, qiniu, openable, zoomIn } = logo;

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
                <a
                  className={classnames({ 'zoom-in': zoomIn })}
                  href={url}
                  target="_blank"
                  onClick={this.onLogoClick}
                >
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

  render() {
    const { title, action, content, match, tabs, defaultTab } = this.props;

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
          {this.renderLogo()}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
            </div>
          </div>
        </div>

        {tabs && tabs.length && (
          <Tabs
            className={styles.tabs}
            defaultActiveKey={defaultTab}
            onChange={this.onTabChange}
            animated={true}
          >
            {tabs.map(({ key, tab }) => (
              <TabPane key={key} tab={tab} />
            ))}
          </Tabs>
        )}
      </div>
    );
  }
}
