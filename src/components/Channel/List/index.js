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
@injectApi('channel')
@injectProto('ref', 'setStateAsync')
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

  componentDidMount() {
    addHistoryListener(this, querySchema);
  }

  componentWillUnmount() {
    removeHistoryListener(this);
  }

  /**
   *  获取条目列表
   *  @param {number} offset 页面位移
   *  @param {number} limit 每页限制
   */
  fetchEntryList = async (offset, limit) => {
   const { entriesProp } = this.state;
   const query = genQueryArgs(this, offset, limit, querySchema);

     try {
      await this.setStateAsync({ loading: true });
      const {
        total,
        [entriesProp]: entries
      } = await this.fetchChannelList(query);

      await this.setStateAsync({
        total,
        entries,
        loading: false,
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
      catchError(this, err, { loading: true });
    }
  }

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

  publishEntries = () => handleEntries(this, '激活', 'publishChannel', {
    shouldIgnore: entry => entry.publishAt
  });

  recoverEntries = () => handleEntries(this, '恢复', 'recoverChannel', {
    shouldIgnore: entry => !entry.removeAt
  });

  blockEntries = () => handleEntries(this, '冻结', 'blockChannel', {
    shouldIgnore: entry => !entry.publishAt
  });

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
      docTitle, total, loading, columns, entries, offset, limit,
      selectedRowKeys, timeline
    } = this.state;

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
          <CardLayout>
            <EntryTable
              total={total}
              loading={loading}
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
          </CardLayout>
        </PageHeaderLayout>
      </DocumentTitle>
    );
  }
}
