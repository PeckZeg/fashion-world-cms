import React from 'react';

import RecommendAtCol from '@table-column/RecommendAt';
import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status';
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '@util/table/genSorter';

const { Action, EditLink } = ActionsCol;
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
            <Action icon="wechat" disabled >
              解除微信绑定
            </Action>
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
