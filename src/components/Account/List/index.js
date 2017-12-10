import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import CardLayout from '~/src/components/layouts/CardLayout';
import EntryTable from '~/src/components/layouts/EntryTable';
import TimelineModal from '~/src/components/TimelineModal';
import ImageViewer from '~/src/components/ImageViewer';
import Toolbar from '@table/Toolbar';
import Filter from './Filter';

import removeHistoryListener from '~/src/utils/list/removeHistoryListener';
import addHistoryListener from '~/src/utils/list/addHistoryListener';
import handleEntries from '~/src/utils/list/handleSelectedEntries';
import genRowSelection from '~/src/utils/table/genRowSelection';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import onTableChange from '~/src/utils/table/onTableChange';
import genPagination from '~/src/utils/table/genPagination';
import genQueryArgs from '~/src/utils/list/genQueryArgs';
import handleEntry from '~/src/utils/list/handleEntry';
import initState from '~/src/utils/list/initState';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import injectApi from '~/src/utils/injectApi';
import * as querySchema from './querySchema';
import genColumns from './genColumns';

@withRouter
@connect(mapMyToProps)
@injectApi('account')
@injectProto('ref', 'setStateAsync')
export default class List extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, querySchema, {
      timeline: [],
      entriesProp: 'accounts',
      entryProp: 'account',
      entryTitle: '账号',
      entryNameProp: 'name'
    });
  }

  componentDidMount() {
    addHistoryListener(this, querySchema);
  }

  componentWillUnmount() {
    removeHistoryListener(this);
  }

  /**
   *  打开图片预览模态
   *  @param {object} entry 条目字典
   */
  openImageViewer = entry => {
    this.imageViewer.show(entry.avatar, (
      <ImageViewer.Title
        icon="user"
        title={entry.name}
        avatar={toProcessImage(entry.avatar, { w: 32, h: 32 })}
      />
    ));
  }

  /**
   *  获取条目列表
   *  @param {number} offset 页面位移
   *  @param {number} limit 每页限制
   */
  fetchEntryList = async (offset, limit, loadingProp = 'loading') => {
    const { entriesProp } = this.state;
    const query = genQueryArgs(this, offset, limit, querySchema);

    try {
      await this.setStateAsync({ [loadingProp]: true });
      const {
        total,
        [entriesProp]: entries
      } = await this.fetchAccountList(query);

      await this.setStateAsync({
        total,
        entries,
        [loadingProp]: false,
        offset: query.offset + 1,
        limit: query.limit,
        columns: genColumns(this, query)
      });

      // const entry = entries.filter(entry => entry.avatar)[0];
      //
      // if (entry) {
      //   this.openImageViewer(entry);
      // }
    }

    catch (err) {
      catchError(this, err, { loading: loadingProp });
    }
  }

  /**
   *  同步条目列表
   */
  onSyncEntryList = async () => {
    const { offset, limit } = this.state;
    await this.fetchEntryList(offset - 1, limit, 'tableLoading');
  };

  /**
   *  激活多条条目
   */
  activeEntries = () => handleEntries(this, '激活', 'activeAccount', {
    shouldIgnore: entry => entry.activeAt
  });

  /**
   *  冻结多个条目
   */
  blockEntries = () => handleEntries(this, '冻结', 'blockAccount', {
    shouldIgnore: entry => !entry.activeAt
  });

  /**
   *  恢复多个条目
   */
  recoverEntries = () => handleEntries(this, '恢复', 'recoverAccount', {
    shouldIgnore: entry => !entry.removeAt
  })

  /**
   *  删除多个条目
   */
  destroyEntries = () => handleEntries(this, '删除', 'destroyAccount', {
    shouldIgnore: entry => entry.removeAt
  })

  /**
   *  激活条目
   *  @param {React.Component} button 按钮组件实例
   */
  activeEntry = button => handleEntry(this, button, '激活', 'activeAccount');

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
   *  恢复条目
   *  @param {React.Component} button 按钮组件实例
   */
  recoverEntry = button => handleEntry(this, button, '恢复', 'recoverAccount');

  /**
   *  表格改变处理器
   */
  onTableChange = (...args) => onTableChange(this, ...args, querySchema);

  /**
   *  变更行选择处理器
   *  @param {ObjectId[]} selectedRowKeys 已选择的行列表
   */
  onRowChange = selectedRowKeys => this.setState({ selectedRowKeys });

  /**
   *  清空已选择行处理器
   */
  onEmptyRowKeys = () => this.setState({ selectedRowKeys: [] });

  render() {
    const {
      docTitle, total, loading, tableLoading, columns, entries, offset, limit,
      selectedRowKeys, timeline
    } = this.state;

    const filter = (
      <Filter onSync={this.onSyncEntryList} />
    );

    const toolbar = (
      <Toolbar
        visible={!!selectedRowKeys.length}
        extra={`已选择 ${selectedRowKeys.length} 个项目`}
      >
        <Button type="primary" onClick={this.activeEntries}>激活</Button>
        <Button type="default" onClick={this.recoverEntries}>恢复</Button>
        <Button type="danger" onClick={this.blockEntries}>冻结</Button>
        <Button type="danger" onClick={this.destroyEntries}>删除</Button>
        <Button onClick={this.onEmptyRowKeys}>取消</Button>
      </Toolbar>
    );

    return (
      <DocumentTitle title={docTitle}>
        <PageHeaderLayout loading={loading}>
          <CardLayout extra={filter}>
            <EntryTable
              total={total}
              loading={tableLoading}
              columns={columns}
              dataSource={entries}
              pagination={genPagination({ total, offset, limit })}
              rowSelection={genRowSelection(this)}
              rowKey="_id"
              onChange={this.onTableChange}
            />

            <ImageViewer ref={this.ref.bind(this, 'imageViewer')} />

            {toolbar}

            <TimelineModal ref={this.ref.bind(this, 'timelineModal')}>
              {timeline}
            </TimelineModal>
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
