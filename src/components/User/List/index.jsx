import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';

import TimingPublishModal from '@components/TimingPublishModal';
import PageHeaderLayout from '@layout/PageHeaderLayout';
import TimelineModal from '@components/TimelineModal';
import ImageViewer from '@components/ImageViewer';
import CardLayout from '@layout/CardLayout';
import EntryTable from '@layout/EntryTable';
import Toolbar from '@table/Toolbar';
import Filter from './Filter';

import genRowSelection from '@util/table/genRowSelection';
import historyListener from '@util/list/historyListener';
import toProcessImage from '@util/qiniu/toProcessImage';
import mapMyToProps from '@util/connect/mapMyToProps';
import onTableChange from '@util/table/onTableChange';
import genPagination from '@util/table/genPagination';
import genQueryArgs from '@util/list/genQueryArgs';
import initState from '@util/list/initState';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';
import * as querySchema from './querySchema';
import genColumns from './genColumns';

/**
 *  用户列表
 *  @class
 */
 @withRouter
 @connect(mapMyToProps)
 @injectApi('user')
 @injectProto('ref', 'setStateAsync', 'hasPermission')
 @historyListener(querySchema)
export default class List extends PureComponent {
  constructor(props) {
    super(props);

    initState(this, props, querySchema, {
      timeline: [],
      entriesProp: 'users',
      entryProp: 'user',
      entryTitle: '用户',
      entryNameProp: 'name'
    });
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
      } = await this.fetchUserList(query);

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
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
};
