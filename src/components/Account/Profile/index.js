import DocumentTitle from 'react-document-title';
import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import random from 'lodash/random';

import removeHistoryListener from '~/src/utils/profile/removeHistoryListener';
import addHistoryListener from '~/src/utils/profile/addHistoryListener';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
import formatTimestamp from '~/src/utils/formatTimestamp';
import initState from '~/src/utils/profile/initState';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import CardLayout from '~/src/components/layouts/CardLayout';
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
export default class AccountProfile extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, 'accountId', {
      docTitle: '账号信息',
      entryProp: 'account',
      entryTitle: '账号',
      entryNameProp: 'name'
    });
  }

  componentDidMount() {
    addHistoryListener(this);
  }

  componentWillUnmount() {
    removeHistoryListener(this);
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
        entry,
      });
    }

    catch (err) {
      const { response } = catchError(this, err);

      if (response) {
        this.setState({ exception: <Exception type={response.status} /> });
      }

      this.setState({ loading: false });
    }
  };

  openImageViewer = () => {
    console.log(this.entry);
  }

  render() {
    const { docTitle, loading, exception, entry } = this.state;
    let logo, title, desc;

    if (entry) {
      title = entry.name;
      // logo = toProcessImage(entry.avatar, { w: 64, h: 64 });
      logo = {
        url: entry.avatar,
        visible: true,
        icon: 'user',
        qiniu: true,
        openable: true,
        onClick: this.openImageViewer
      };
      desc = (
        <DescList>
          <DescListItem label="激活时间">
            {formatTimestamp(entry.activeAt)}
          </DescListItem>
          <DescListItem label="删除时间">
            {formatTimestamp(entry.removeAt)}
          </DescListItem>
          <DescListItem label="创建时间">
            {formatTimestamp(entry.createAt)}
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
        >
          <CardLayout>
            {exception ? exception : (
              <Fragment>
                <Button.Group>
                  {TEST_ID.map(id => (
                    <Button key={id}>
                      <Link to={`/account/${id}`}>
                        {id}
                      </Link>
                    </Button>
                  ))}
                </Button.Group>

                <pre style={{ margin: '14px 0 0' }}>
                  {JSON.stringify(this.state.entry, null, 2)}
                </pre>
              </Fragment>
            )}
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
