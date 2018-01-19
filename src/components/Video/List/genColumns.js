import React from 'react';

import RecommendAtCol from '@table-column/RecommendAt';
import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status';
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '@util/table/genSorter';

const { LinkAction, Action, EditLink, SwitchAction } = ActionsCol;
const { ChannelHead } = TitleCol;

/**
 *  生成表格栏参数
 *  @param {React.Component} com 当前组件实例
 *  @param {object} query 查询对象
 *  @returns {object[]} 表格栏参数
 */
export default function(com, query) {
  const { searchTitle } = query;

  return [
    {
      dataIndex: 'cover',
      title: '封面',
      width: 80,
      render: (cover, entry) => (
        <CoverCol
          value={cover}
          icon="video-camera"
          onClick={com.openImageViewer.bind(com, entry)}
        />
      )
    },
    {
      dataIndex: 'status',
      title: '状态',
      width: 64,
      render: (status, entry) => (
        <StatusCol
          publishAt={entry.publishAt}
          removeAt={entry.removeAt}
        />
      )
    },
    {
      dataIndex: 'recommendAt',
      title: '推荐',
      width: 64,
      render: recommendAt => <RecommendAtCol value={recommendAt} />
    },
    {
      dataIndex: 'title',
      title: '标题',
      render: (title, entry) => (
        <TitleCol
          head={<ChannelHead categoryVisible entry={entry} />}
          title={title}
          searchTitle={searchTitle}
          link={com.genLink(entry)}
          desc={entry.abstract}
        />
      )
    },
    {
      dataIndex: 'priority',
      title: '排序值',
      width: 128,
      ...genSorter(query, 'priority'),
      render: priority => <code>{priority}</code>
    },
    {
      dataIndex: 'createAt',
      title: '创建时间',
      ...genSorter(query, 'createAt'),
      width: 160,
      render: createAt => <CreateAtCol value={createAt} />
    },
    {
      dataIndex: 'actions',
      title: '操作',
      width: 160,
      float: 'right',
      render(actions, entry) {
        const more = (
          <ul>
            <LinkAction icon="video-camera" to={com.genLink(entry, '/player')}>
              预览
            </LinkAction>
            <LinkAction icon="file-text" to={com.genLink(entry, '/avinfo')}>
              元信息
            </LinkAction>
            <SwitchAction
              disabled={!com.hasPermission('UPDATE_VIDEO')}
              entry={entry}
              status={!entry.publishAt}
              yesLabel="发布"
              yesIcon="check"
              noIcon="lock"
              noLabel="冻结"
              onYesClick={com.publishEntry}
              onNoClick={com.blockEntry}
            />
            {!entry.publishAt && (
              <Action
                icon="clock-circle-o"
                disabled={!com.hasPermission('UPDATE_VIDEO')}
                onClick={com.openTimingPublishModal.bind(com, entry)}
              >
                定时发布
              </Action>
            )}
            <SwitchAction
              disabled={!com.hasPermission('UPDATE_VIDEO')}
              entry={entry}
              status={!entry.recommendAt}
              yesLabel="推荐"
              yesIcon="like"
              noLabel="取消推荐"
              noIcon="like-o"
              onYesClick={com.recommendEntry}
              onNoClick={com.supplantEntry}
            />
            {!entry.recommendAt && (
              <Action
                icon="clock-circle-o"
                disabled={!com.hasPermission('UPDATE_VIDEO')}
                onClick={com.openTimingRecommendModal.bind(com, entry)}
              >
                定时推荐
              </Action>
            )}
            <SwitchAction
              disabled={!com.hasPermission('DESTROY_VIDEO')}
              entry={entry}
              status={!entry.removeAt}
              yesType="danger"
              yesLabel="删除"
              yesIcon="delete"
              noType="default"
              noIcon="rollback"
              noLabel="恢复"
              onYesClick={com.destroyEntry}
              onNoClick={com.recoverEntry}
            />
          </ul>
        );

        return (
          <ActionsCol moreContent={more}>
            <EditLink
               to={com.genLink(entry, '/edit')}
               disabled={!com.hasPermission('UPDATE_USER')}
            />
          </ActionsCol>
        );
      }
    }
  ];
};
