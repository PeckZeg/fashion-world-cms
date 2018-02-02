import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import get from 'lodash/get';

import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status'
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '@util/table/genSorter';
import { types } from '@const/banner/types';

const { Action, SwitchAction, EditLink } = ActionsCol;
const { ChannelHead } = TitleCol;

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
      render: (title, entry) => {
        const type = types.filter(({ key }) => entry.type === key)[0];
        const typeLabel = (
          <Fragment>
            <Icon type={type.icon} style={{ marginRight: '0.5em' }} />
            {type.label}
          </Fragment>
        );
        let headChildren = null;

        switch (entry.type) {
          case 'URL':
            headChildren = (
              <a href={entry.value.url} target="_blank">
                {entry.value.url}
              </a>
            );
            break;

          case 'GOTO_VIDEO_PROFILE':
            headChildren = (
              entry.video ? (
                <Link to={`/video/${get(entry, 'video._id')}`}>
                  {get(entry, 'video.title')}
                </Link>
              ) : '未知视频'
            );
            break;

          default:
            headChildren = '-';
        }

        const head = (
          <Fragment>
            <p>
              <ChannelHead categoryVisible entry={entry} />
            </p>
            <p>
              {typeLabel}：{headChildren}
            </p>
          </Fragment>
        );

        return (
          <TitleCol
            head={head}
            title={title}
            searchTitle={searchTitle}
            desc={entry.description}
            link={com.genLink(entry)}
          />
        );
      }
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
              disabled={!com.hasPermission('UPDATE_BANNER')}
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
                disabled={!com.hasPermission('UPDATE_BANNER')}
                onClick={com.openTimingPublishModal.bind(com, entry)}
              >
                定时发布
              </Action>
            )}
            <SwitchAction
              disabled={!com.hasPermission('DESTROY_BANNER')}
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
              disabled={!com.hasPermission('UPDATE_BANNER')}
            />
          </ActionsCol>
        );
      }
    }
  ];
};
