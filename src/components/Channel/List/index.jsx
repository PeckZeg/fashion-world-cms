import React, { PureComponent, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';

import PageHeaderLayout from '~/src/components/layouts/PageHeaderLayout';
import TimingPublishModal from '~/src/components/TimingPublishModal';
import CardLayout from '~/src/components/layouts/CardLayout';
import EntryTable from '~/src/components/layouts/EntryTable';
import TimelineModal from '~/src/components/TimelineModal';
import ImageViewer from '~/src/components/ImageViewer';
import Toolbar from '@table/Toolbar';
import Filter from './Filter';

import handleEntries from '~/src/utils/list/handleSelectedEntries';
import genRowSelection from '~/src/utils/table/genRowSelection';
import historyListener from '~/src/utils/list/historyListener';
import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import validateFields from '~/src/utils/form/validateFields';
import mapMyToProps from '~/src/utils/connect/mapMyToProps';
import onTableChange from '~/src/utils/table/onTableChange';
import genPagination from '~/src/utils/table/genPagination';
import genQueryArgs from '~/src/utils/list/genQueryArgs';
import handleEntry from '~/src/utils/list/handleEntry';
import initState from '~/src/utils/list/initState';
import injectProto from '~/src/utils/injectProto';
import catchError from '~/src/utils/catchError';
import replace from '~/src/utils/array/replace';
import injectApi from '~/src/utils/injectApi';
import * as querySchema from './querySchema';
import genColumns from './genColumns';

@withRouter
@connect(mapMyToProps)
@injectApi('channel')
@injectProto('ref', 'setStateAsync', 'hasPermission')
@historyListener(querySchema)
export default class List extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, querySchema, {
      timeline: [],
      entriesProp: 'channels',
      entryProp: 'channel',
      entryTitle: '频道',
      entryNameProp: 'name'
    });
  }

  /**
   *  打开定时发布模态
   *  @param {object} entry 待定时发布的条目
   */
  openTimingPublishModal = entry => this.timingPublishModal.open(entry, {
    title: (
      <Fragment>
        <Icon type="clock-circle-o" />
        定时发布{this.state.entryTitle}
        <small>
          {entry.name}
        </small>
      </Fragment>
    )
  });

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
      } = await this.fetchChannelList(query);

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
   *  @returns {Promise}
   */
  onSyncEntryList = async () => {
    const { offset, limit } = this.state;
    await this.fetchEntryList(offset - 1, limit, 'tableLoading');
  };

  /**
   *  定时发布条目
   *  @param {object} entry 条目
   *  @returns {Promise}
   */
  publishTimingEntry = async (modal, form, entry) => {
    const { entryProp } = this.state;
    const { _id: entryId } = entry;

    try {
      await modal.startSubmit();
      const body = await validateFields(form);
      const { [entryProp]: newEntry } = await this.publishChannel(entryId, body);
      const entries = replace(this.state.entries, entry, newEntry);

      await this.setStateAsync({ entries });
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
   *  @param {React.Component} button 按钮组件实例
   */
  publishEntry = btn => handleEntry(this, btn, '发布', 'publishChannel');

  /**
   *  恢复条目
   *  @param {React.Component} button 按钮组件实例
   */
  recoverEntry = btn => handleEntry(this, btn, '恢复', 'recoverChannel');

  /**
   *  冻结条目
   *  @param {React.Component} button 按钮组件实例
   */
  blockEntry = btn => handleEntry(this, btn, '冻结', 'blockChannel');

  /**
   *  删除条目
   *  @param {React.Component} button 按钮组件实例
   */
  destroyEntry = btn => handleEntry(this, btn, '删除', 'destroyChannel');

  /**
   *  激活已选择条目
   */
  publishEntries = () => handleEntries(this, '激活', 'publishChannel', {
    shouldIgnore: entry => entry.publishAt
  });

  /**
   *  恢复已选择条目
   */
  recoverEntries = () => handleEntries(this, '恢复', 'recoverChannel', {
    shouldIgnore: entry => !entry.removeAt
  });

  /**
   *  冻结已选择条目
   */
  blockEntries = () => handleEntries(this, '冻结', 'blockChannel', {
    shouldIgnore: entry => !entry.publishAt
  });

  /**
   *  删除已选择条目
   */
  destroyEntries = () => handleEntries(this, '删除', 'destroyChannel', {
    shouldIgnore: entry => entry.removeAt
  });

   /**
    *  打开图片预览模态
    *  @param {object} entry 条目字典
    */
   openImageViewer = entry => {
     this.imageViewer.show(entry.cover, (
       <ImageViewer.Title
         icon="user"
         title={entry.name}
         avatar={toProcessImage(entry.cover, { w: 32, h: 32 })}
       />
     ));
   }

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
      docTitle, total, tableLoading, loading, columns, entries, offset, limit,
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
        <Button type="primary" onClick={this.publishEntries}>发布</Button>
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

            {toolbar}

            <ImageViewer ref={this.ref.bind(this, 'imageViewer')} />

            <TimelineModal ref={this.ref.bind(this, 'timelineModal')}>
              {timeline}
            </TimelineModal>

            <TimingPublishModal
              onRef={this.ref.bind(this, 'timingPublishModal')}
              onSubmit={this.publishTimingEntry}
            />
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
