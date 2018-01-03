import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import random from 'lodash/random';

import PageHeaderLayout from '@components/layouts/PageHeaderLayout';
import Exception from 'ant-design-pro/lib/Exception';
import ImageViewer from '@components/ImageViewer';

import historyListener from '@util/profile/historyListener';
import toProcessImage from '@util/qiniu/toProcessImage';
import mapMyToProps from '@util/connect/mapMyToProps';
import renderRoute from '@util/profile/renderRoute';
import setTimeoutAsync from '@util/setTimeoutAsync';
import initState from '@util/profile/initState';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';

import genHeaderItems from './genHeaderItems';
import genRoutes from './genRoutes';
import genTabs from './genTabs';

/**
 *  用户资料页
 *  @class
 */
@withRouter
@connect(mapMyToProps)
@injectApi('user')
@injectProto('ref', 'setStateAsync')
@historyListener('setTabs')
export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, 'userId', {
      docTitle: '用户信息',
      entryProp: 'user',
      entryTitle: '用户',
      entryNameProp: 'name',
      defaultTab: props.location.pathname,
      ...genTabs(this)
    });
  }

  /**
   *  标签切换处理器
   *  @param {string} pathname 切换的路径
   */
  onTabChange = pathname => {
    this.props.history.push(pathname);
  }

  /**
   *  条目更新处理器
   *  @param {object} entry 更新后的条目
   */
  onUpdate = entry => this.setState({ entry, entryId: entry._id });

  /**
   *  获取条目信息
   */
  fetchEntry = async () => {
    const { entryId, entryProp, entryNameProp } = this.state;

    try {
      await this.setStateAsync({ loading: true, entry: null, exception: null });
      const { [entryProp]: entry } = await this.fetchUserProfile(entryId);

      await setTimeoutAsync(random(256, 1024));
      await this.setStateAsync({
        docTitle: `账号 ${entry[entryNameProp]} 信息`,
        loading: false,
        entry
      });
    }

    catch (err) {
      const { response } = catchError(this, err);
      let state = { loading: false };

      if (response) {
        state.exception = <Exception type={response.status} />;
      }

      this.setState(state);
    }
  };

  /**
   *  打开图片预览器
   */
  openImageViewer = () => {
    const { entry, entryNameProp } = this.state;

    this.imageViewer.show(entry.avatar, (
      <ImageViewer.Title
        icon="picture"
        title={entry[entryNameProp]}
        avatar={toProcessImage(entry.cover, { w: 32, h: 32 })}
      />
    ));
  }

  /**
   *  设置选项卡
   */
  setTabs = ({ location, match } = {}) => {
    this.setState(genTabs(this, location, match));
  }

  render() {
    const {
      docTitle, loading, exception, entry, defaultTab, tabs
    } = this.state;
    const routes = genRoutes(this);
    const headerProps = genHeaderItems(this, entry);

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout
          loading={loading}
          exception={exception}
          tabs={tabs}
          defaultTab={defaultTab ? defaultTab : void 0}
          onTabChange={this.onTabChange}
          {...headerProps}
        >
          <Switch>
            {routes.map(({ path, Component, ...restProps }) => (
              <Route
                key={path}
                path={path}
                render={renderRoute.bind(this, Component)}
                {...restProps}
              />
            ))}
          </Switch>

          <ImageViewer
            ref={this.ref.bind(this, 'imageViewer')}
          />
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
