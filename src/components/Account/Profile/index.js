import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Route, Switch } from 'react-router-dom';

import random from 'lodash/random';

import historyListener from '~/src/utils/profile/historyListener';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
import formatTimestamp from '~/src/utils/formatTimestamp';
import initState from '~/src/utils/profile/initState';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import genRoutes from './genRoutes';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import ImageViewer from '~/src/components/ImageViewer';
import Exception from 'ant-design-pro/lib/Exception';
import DescList from '~/src/components/DescList';

const { Item: DescListItem } = DescList;

const TEST_ID = [
  '593512d8a58737dbdb6308da',
  '597855e6a1522a303fc6f712',
  '5a13df708e83984e9f4aef2d'
];

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

  onTabChange = pathname => {
    this.props.history.push(pathname);
  }

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

  renderRoute = Component => {
    return (
      <Component
        entry={this.state.entry}
      />
    );
  }

  render() {
    const {
      docTitle, loading, exception, entry, defaultTab, tabs
    } = this.state;
    const routes = genRoutes(this);
    let logo, title, desc;

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
    }

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout
          loading={loading}
          logo={logo}
          title={title}
          content={desc}
          exception={exception}
          tabs={tabs}
          defaultTab={defaultTab ? defaultTab : void 0}
          onTabChange={this.onTabChange}
        >
          <Button.Group style={{ marginBottom: '16px' }}>
            {TEST_ID.map(id => (
              <Button key={id}>
                <Link to={`/account/${id}`}>
                  {id}
                </Link>
              </Button>
            ))}
          </Button.Group>

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
