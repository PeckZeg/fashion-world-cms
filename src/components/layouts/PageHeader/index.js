import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'antd';

import { breadcrumbRoutes, breadcrumbIndexRoutes } from '~/src/const/siders';

import styles from './styles.css';

@withRouter
export default class PageHeader extends PureComponent {
  componentDidMount() {
    // console.log(breadcrumbIndexRoutes);
  }

  pushRoute = e => {
    const { location: { pathname }, history } = this.props
    const link = e.target.getAttribute('href');

    e.preventDefault();

    if (pathname !== link) {
      history.push(link);
    }
  }

  renderSubBreadcrumb = () => {
    const { route, label } = breadcrumbIndexRoutes[this.props.match.path] || {};

    if (route && label) {
      return (
        <a href={route} onClick={this.pushRoute}>
          {label}
        </a>
      );
    }
  }

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
