import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import random from 'lodash/random';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import TimingPublishModal from '~/src/components/TimingPublishModal';
import ImageViewer from '~/src/components/ImageViewer';
import Exception from 'ant-design-pro/lib/Exception';

import historyListener from '~/src/utils/profile/historyListener';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import validateFields from '~/src/utils/form/validateFields';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
import handleEntry from '~/src/utils/profile/handleEntry';
import initState from '~/src/utils/profile/initState';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import genHeaderItems from './genHeaderItems';
import genRoutes from './genRoutes';
import genTabs from './genTabs';

@withRouter
@connect(mapMyToProps)
@injectApi('channel')
@injectProto('ref', 'setStateAsync')
@historyListener('setTabs')
export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, 'channelId', {
      docTitle: '频道信息',
      entryProp: 'channel',
      entryTitle: '频道',
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
      const { [entryProp]: entry } = await this.fetchChannelProfile(entryId);

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
    const { entry } = this.state;

    this.imageViewer.show(entry.cover, (
      <ImageViewer.Title
        icon="picture"
        title={entry.name}
        avatar={toProcessImage(entry.cover, { w: 32, h: 32 })}
      />
    ));
  }

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
      const { [entryProp]: newEntry } = await this.publishChannel(entryId, body);

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
  publishEntry = btn => handleEntry(this, btn, '发布', 'publishChannel');

  /**
   *  恢复条目
   *  @param {React.Component} btn 按钮
   */
  recoverEntry = btn => handleEntry(this, btn, '恢复', 'recoverChannel');

  /**
   *  冻结条目
   *  @param {React.Component} btn 按钮
   */
  blockEntry = btn => handleEntry(this, btn, '冻结', 'blockChannel');

  /**
   *  删除条目
   *  @param {React.Component} btn 按钮
   */
  destroyEntry = btn => handleEntry(this, btn, '删除', 'destroyChannel');

  /**
   *  渲染路由
   *  @param {React.Component} Component 需要渲染的组件
   */
  renderRoute = Component => {
    const { entry, entryProp, entryTitle, entryNameProp } = this.state;
    const props = { entry, entryProp, entryTitle, entryNameProp };

    return (
      <Component
        {...props}
        onUpdate={this.onUpdate}
      />
    );
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
                render={this.renderRoute.bind(this, Component)}
                {...restProps}
              />
            ))}
          </Switch>

          <ImageViewer
            ref={this.ref.bind(this, 'imageViewer')}
          />

          <TimingPublishModal
            onRef={this.ref.bind(this, 'timingPublishModal')}
            onSubmit={this.publishTimingEntry}
          />
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
