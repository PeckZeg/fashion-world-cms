import React, { PureComponent, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';

import TimingPublishModal from '@components/TimingPublishModal';
import PageHeaderLayout from '@layout/PageHeaderLayout';
import TimelineModal from '@components/TimelineModal';
import ImageViewer from '@components/ImageViewer';
import CardLayout from '@layout/CardLayout';
import EntryTable from '@layout/EntryTable';
import Toolbar from '@table/Toolbar';
import Filter from './Filter';

import handleEntries from '@util/list/handleSelectedEntries';
import genRowSelection from '@util/table/genRowSelection';
import historyListener from '@util/list/historyListener';
import toProcessImage from '@util/qiniu/toProcessImage';
import mapMyToProps from '@util/connect/mapMyToProps';
import onTableChange from '@util/table/onTableChange';
import validateFields from '@util/form/validateFields';
import genPagination from '@util/table/genPagination';
import genQueryArgs from '@util/list/genQueryArgs';
import handleEntry from '@util/list/handleEntry';
import initState from '@util/list/initState';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import replace from '@util/array/replace';
import injectApi from '@util/injectApi';

import * as querySchema from './querySchema';
import genColumns from './genColumns';

/**
 *  视频列表
 *  @class
 */
@withRouter
@connect(mapMyToProps)
@injectApi('video')
@injectProto('ref', 'setStateAsync', 'hasPermission', 'genLink')
@historyListener(querySchema)
export default class List extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, querySchema, {
      timeline: [],
      entriesProp: 'videos',
      entryProp: 'video',
      entryTitle: '视频',
      entryNameProp: 'title'
    });
  }

  /**
   *  打开图片预览模态
   *  @param {object} entry 条目字典
   */
  openImageViewer = entry => {
    this.imageViewer.show(entry.cover, (
      <ImageViewer.Title
        icon="video-camera"
        title={entry.title}
        avatar={toProcessImage(entry.cover, { w: 32, h: 32 })}
      />
    ));
  }

  /**
   *  打开定时发布模态
   *  @this 当前组件实例
   *  @param {object} entry 待定时发布的条目
   */
  openTimingPublishModal = entry => this.timingPublishModal.open(entry, {
    title: (
      <Fragment>
        <Icon type="clock-circle-o" />
        定时发布{this.state.entryTitle}
        <small>
          {entry.title}
        </small>
      </Fragment>
    )
  });

  /**
   *  打开定时推荐模态
   *  @this 当前组件实例
   *  @param {object} entry 待定时发布的条目
   */
  openTimingRecommendModal = entry => this.timingRecommendModal.open(entry, {
    title: (
      <Fragment>
        <Icon type="clock-circle-o" />
        定时推荐{this.state.entryTitle}
        <small>
          {entry.title}
        </small>
      </Fragment>
    )
  });

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

  /**
   *  同步条目列表
   *  @returns {Promise}
   */
  onSyncEntryList = async () => {
    const { offset, limit } = this.state;
    await this.fetchEntryList(offset - 1, limit, 'tableLoading');
  };

  /**
   *  获取条目列表
   *  @param {number} offset 页面位移
   *  @param {number} limit 每页限制
   *  @param {string} [loadingProp = 'loading'] 加载状态属性
   */
  fetchEntryList = async (offset, limit, loadingProp = 'loading') => {
   const { entriesProp } = this.state;
   const query = genQueryArgs(this, offset, limit, querySchema);

     try {
      await this.setStateAsync({ [loadingProp]: true });
      const {
        total,
        [entriesProp]: entries
      } = await this.fetchVideoList(query);

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

      // this.openTimingPublishModal(entries[0]);
    }

    catch (err) {
      catchError(this, err, { loading: loadingProp });
    }
  }

  /**
   *  发布条目
   *  @this 当前组件实例
   *  @param {React.Component} btn 按钮组件实例
   */
  publishEntry = btn => handleEntry(this, btn, '发布', 'publishVideo');

  /**
   *  推荐条目
   *  @this 当前组件实例
   *  @param {React.Component} btn 按钮组件实例
   */
  recommendEntry = btn => handleEntry(this, btn, '推荐', 'recommendVideo');

  /**
   *  恢复条目
   *  @this 当前组件实例
   *  @param {React.Component} button 按钮组件实例
   */
  recoverEntry = btn => handleEntry(this, btn, '恢复', 'recoverVideo');

  /**
   *  取消推荐条目
   *  @this 当前组件实例
   *  @param {React.Component} btn 按钮组件实例
   */
  supplantEntry = btn => handleEntry(this, btn, '取消推荐', 'supplantVideo');

  /**
   *  冻结条目
   *  @this 当前组件实例
   *  @param {React.Component} button 按钮组件实例
   */
  blockEntry = btn => handleEntry(this, btn, '冻结', 'blockVideo');

  /**
   *  删除条目
   *  @this 当前组件实例
   *  @param {React.Component} button 按钮组件实例
   */
  destroyEntry = btn => handleEntry(this, btn, '删除', 'destroyVideo');

  /**
   *  激活已选择条目
   *  @this 当前组件实例
   */
  publishEntries = () => handleEntries(this, '激活', 'publishVideo', {
    shouldIgnore: entry => entry.publishAt
  });

  /**
   *  恢复已选择条目
   *  @this 当前组件实例
   */
  recoverEntries = () => handleEntries(this, '恢复', 'recoverVideo', {
    shouldIgnore: entry => !entry.removeAt
  });

  /**
   *  冻结已选择条目
   *  @this 当前组件实例
   */
  blockEntries = () => handleEntries(this, '冻结', 'blockVideo', {
    shouldIgnore: entry => !entry.publishAt
  });

  /**
   *  删除已选择条目
   *  @this 当前组件实例
   */
  destroyEntries = () => handleEntries(this, '删除', 'destroyVideo', {
    shouldIgnore: entry => entry.removeAt
  });

  /**
   *  定时发布条目
   *  @this 当前组件实例
   *  @param {React.Component} modal 模态
   *  @param {object} form 表单
   *  @param {object} entry 条目字典
   *  @returns {Promise}
   */
  publishTimingEntry = async (modal, form, entry) => {
    const { entryProp } = this.state;
    const { _id: entryId } = entry;

    try {
      await modal.startSubmit();
      const body = await validateFields(form);
      const { [entryProp]: newEntry } = await this.publishVideo(entryId, body);
      const entries = replace(this.state.entries, entry, newEntry);

      await this.setStateAsync({ entries });
      await modal.endSubmit();
      await modal.close();
    }

    catch (err) {
      await modal.endSubmit();
      catchError(this, err);
    }
  }

  /**
   *  定时推荐条目
   *  @this 当前组件实例
   *  @param {React.Component} modal 模态
   *  @param {object} form 表单
   *  @param {object} entry 条目字典
   *  @returns {Promise}
   */
  recommendTimingEntry = async (modal, form, entry) => {
    const { entryProp } = this.state;
    const { _id: entryId } = entry;

    try {
      await modal.startSubmit();
      const body = await validateFields(form);
      const { [entryProp]: newEntry } = await this.recommendVideo(entryId, body);
      const entries = replace(this.state.entries, entry, newEntry);

      await this.setStateAsync({ entries });
      await modal.endSubmit();
      await modal.close();
    }

    catch (err) {
      await modal.endSubmit();
      catchError(this, err);
    }
  }

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
        <Button type="primary" disabled>解除微信绑定</Button>
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

            <TimingPublishModal
              onRef={this.ref.bind(this, 'timingRecommendModal')}
              onSubmit={this.recommendTimingEntry}
            />
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
};
