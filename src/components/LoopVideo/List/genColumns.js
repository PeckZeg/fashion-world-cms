import React from 'react';

import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status'
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '@util/table/genSorter';

const { Action, SwitchAction, EditLink } = ActionsCol;

export default function(com, query) {
  const { searchTitle } = query;

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
      dataIndex: 'title',
      title: '标题',
      render: (title, entry) => (
        <TitleCol
          title={title}
          searchTitle={searchTitle}
          desc={entry.subtitle}
          link={com.genLink(entry)}
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
            <SwitchAction
              disabled={!com.hasPermission('UPDATE_CHANNEL')}
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
                disabled={!com.hasPermission('UPDATE_CHANNEL')}
                onClick={com.openTimingPublishModal.bind(com, entry)}
              >
                定时发布
              </Action>
            )}
            <SwitchAction
              disabled={!com.hasPermission('DESTROY_CHANNEL')}
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
              disabled={!com.hasPermission('UPDATE_CHANNEL')}
            />
          </ActionsCol>
        );
      }
    }
  ];
};
