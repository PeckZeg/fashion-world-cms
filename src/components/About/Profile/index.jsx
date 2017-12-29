import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import random from 'lodash/random';

import TimingPublishModal from '@components/TimingPublishModal';
import PageHeaderLayout from '@layout/PageHeaderLayout';
import Exception from 'ant-design-pro/lib/Exception';

import historyListener from '@util/profile/historyListener';
import validateFields from '@util/form/validateFields';
import mapMyToProps from '@util/connect/mapMyToProps';
import renderRoute from '@util/profile/renderRoute';
import setTimeoutAsync from '@util/setTimeoutAsync';
import handleEntry from '@util/profile/handleEntry';
import initState from '@util/profile/initState';
import genHeaderItems from './genHeaderItems';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';
import genRoutes from './genRoutes';
import genTabs from './genTabs';

/**
 *  关于信息
 *  @class
 */
 @withRouter
 @connect(mapMyToProps)
 @injectApi('about')
 @injectProto('ref', 'setStateAsync')
 @historyListener('setTabs')
export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, 'aboutId', {
      docTitle: '关于信息',
      entryProp: 'about',
      entryTitle: '关于',
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
    const { entryId, entryProp, entryNameProp, entryTitle } = this.state;

    try {
      await this.setStateAsync({ loading: true, entry: null, exception: null });
      const { [entryProp]: entry } = await this.fetchAboutProfile(entryId);

      await setTimeoutAsync(random(256, 1024));
      await this.setStateAsync({
        docTitle: `${entryTitle} ${entry[entryNameProp]} 信息`,
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
   *  打开定时发布模态
   */
  openTimingPublishModal = () => this.timingPublishModal.open();

  /**
   *  设置选项卡
   */
  setTabs = ({ location, match } = {}) => {
    this.setState(genTabs(this, location, match));
  }

  /**
   *  定时发布条目
   *  @param {React.Component} modal 模态实例
   *  @param form 表单
   *  @returns {Promise}
   */
  publishTimingEntry = async (modal, form) => {
    const { entryProp, entryId } = this.state;

    try {
      await modal.startSubmit();
      const body = await validateFields(form);
      const { [entryProp]: newEntry } = await this.publishAbout(entryId, body);

      this.onUpdate(newEntry);
      await modal.endSubmit();
      await modal.close();
    }

    catch (err) {
      await modal.endSubmit();
      catchError(this, err);
    }
  };

  /**
   *  发布条目
   *  @param {React.Component} btn 按钮
   */
  publishEntry = btn => handleEntry(this, btn, '发布', 'publishAbout');

  /**
   *  恢复条目
   *  @param {React.Component} btn 按钮
   */
  recoverEntry = btn => handleEntry(this, btn, '恢复', 'recoverAbout');

  /**
   *  冻结条目
   *  @param {React.Component} btn 按钮
   */
  blockEntry = btn => handleEntry(this, btn, '冻结', 'blockAbout');

  /**
   *  删除条目
   *  @param {React.Component} btn 按钮
   */
  destroyEntry = btn => handleEntry(this, btn, '删除', 'destroyAbout');

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

          <TimingPublishModal
            onRef={this.ref.bind(this, 'timingPublishModal')}
            onSubmit={this.publishTimingEntry}
          />
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
};
