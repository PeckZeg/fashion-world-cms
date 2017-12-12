import { Link } from 'react-router-dom';
import React from 'react';

import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status'
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '~/src/utils/table/genSorter';

const { Action, SwitchAction } = ActionsCol;

/**
 *  生成表格栏参数
 *  @param {React.Component} com 当前组件实例
 *  @param {object} query 查询对象
 *  @returns {object[]} 表格栏参数
 */
export default function(com, query) {
  const { searchName } = query;

  return [
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
      dataIndex: 'cover',
      title: '封面',
      width: 80,
      render: (cover, entry) => (
        <CoverCol
          value={cover}
          onClick={com.openImageViewer.bind(com, entry)}
        />
      )
    },
    {
      dataIndex: 'name',
      title: '名称',
      // width: 256,
      render: (name, entry) => (
        <TitleCol
          title={name}
          searchTitle={searchName}
          link={`/channel/${entry._id}`}
        />
      )
    },
    {
      dataIndex: 'priority',
      title: '排序值',
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
            <SwitchAction
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
                onClick={com.openTimingPublishModal.bind(com, entry)}
              >
                定时发布
              </Action>
            )}
            <SwitchAction
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
            <Link to={`/channel/${entry._id}/edit`}>
              编辑
            </Link>
          </ActionsCol>
        );
      }
    }
  ];
};