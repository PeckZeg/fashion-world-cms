import React, { PureComponent, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import random from 'lodash/random';

import historyListener from '~/src/utils/profile/historyListener';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
import formatTimestamp from '~/src/utils/formatTimestamp';
import handleEntry from '~/src/utils/profile/handleEntry';
import initState from '~/src/utils/profile/initState';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import genRoutes from './genRoutes';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import SwitchButton from '~/src/components/SwitchButton';
import ImageViewer from '~/src/components/ImageViewer';
import Exception from 'ant-design-pro/lib/Exception';
import DescList from '~/src/components/DescList';

const { Item: DescListItem } = DescList;

@withRouter
@connect(mapMyToProps)
@injectApi('account')
@injectProto('ref', 'setStateAsync')
@historyListener('setTabs')
export default class AccountProfile extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, 'accountId', {
      docTitle: '账号信息',
      entryProp: 'account',
      entryTitle: '账号',
      entryNameProp: 'name',
      defaultTab: props.location.pathname,
      ...this.tabs()
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
      const { [entryProp]: entry } = await this.fetchAccountProfile(entryId);

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

    this.imageViewer.show(entry.avatar, (
      <ImageViewer.Title
        icon="user"
        title={entry.name}
        avatar={toProcessImage(entry.avatar, { w: 32, h: 32 })}
      />
    ));
  }

  /**
   *  激活条目
   *  @param {React.Component} button 按钮组件实例
   */
  activeEntry = button => handleEntry(this, button, '激活', 'activeAccount');

  /**
   *  恢复条目
   *  @param {React.Component} button 按钮组件实例
   */
  recoverEntry = button => handleEntry(this, button, '恢复', 'recoverAccount');

  /**
   *  冻结条目
   *  @param {React.Component} button 按钮组件实例
   */
  blockEntry = button => handleEntry(this, button, '冻结', 'blockAccount');

  /**
   *  删除条目
   *  @param {React.Component} button 按钮组件实例
   */
  destroyEntry = button => handleEntry(this, button, '删除', 'destroyAccount');

  /**
   *  设置选项卡
   */
  setTabs = (opts = {}) => {
    const { location, match } = opts;

    this.setState(this.tabs(location, match));
  }

  tabs(location = this.props.location, match = this.props.match) {
    const { pathname: defaultTab } = location;

    if (!match) {
      return { defaultTab, tabs: [] };
    }

    const { params: { accountId } } = match;

    return {
      defaultTab,
      tabs: [
        {
          key: `/account/${accountId}`,
          tab: '详情'
        },
        {
          key: `/account/${accountId}/edit`,
          tab: '编辑'
        }
      ]
    };
  }

  /**
   *  渲染路由
   *  @param {React.Component} Component 需要渲染的组件
   */
  renderRoute = Component => {
    return (
      <Component
        entry={this.state.entry}
        onUpdate={this.onUpdate}
      />
    );
  }

  render() {
    const {
      docTitle, loading, exception, entry, defaultTab, tabs
    } = this.state;
    const routes = genRoutes(this);
    let logo, title, desc, action;

    if (entry) {
      title = entry.name;
      logo = {
        url: entry.avatar,
        visible: true,
        icon: 'user',
        qiniu: true,
        openable: true,
        zoomIn: true,
        onClick: this.openImageViewer
      };
      desc = (
        <DescList>
          <DescListItem label="激活时间">
            {formatTimestamp(entry.activeAt, { fromNow: true })}
          </DescListItem>
          <DescListItem label="删除时间">
            {formatTimestamp(entry.removeAt, { fromNow: true })}
          </DescListItem>
          <DescListItem label="创建时间">
            {formatTimestamp(entry.createAt, { fromNow: true })}
          </DescListItem>
        </DescList>
      );
      action = (
        <Fragment>
          <SwitchButton
            status={!entry.activeAt}
            yesLabel="激活"
            noLabel="冻结"
            onYesClick={this.activeEntry}
            onNoClick={this.blockEntry}
          />
          <SwitchButton
            status={!entry.removeAt}
            yesType="danger"
            yesLabel="删除"
            noType="default"
            noLabel="恢复"
            onYesClick={this.destroyEntry}
            onNoClick={this.recoverEntry}
          />
        </Fragment>
      );
    }

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout
          loading={loading}
          logo={logo}
          title={title}
          action={action}
          content={desc}
          exception={exception}
          tabs={tabs}
          defaultTab={defaultTab ? defaultTab : void 0}
          onTabChange={this.onTabChange}
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

          <ImageViewer ref={this.ref.bind(this, 'imageViewer')} />
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
