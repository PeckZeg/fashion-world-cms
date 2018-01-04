import { Icon, Tag, Tooltip } from 'antd';
import React from 'react';

import get from 'lodash/get';

import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import GenderCol from '@table-column/Gender';
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '@util/table/genSorter';
import formatMobile from '@util/formatMobile';

const { Action, EditLink } = ActionsCol;

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
      dataIndex: 'avatar',
      title: '头像',
      width: 80,
      render: (avatar, entry) => (
        <CoverCol
          circular
          value={avatar}
          icon="user"
          onClick={com.openImageViewer.bind(com, entry)}
        />
      )
    },
    {
      dataIndex: 'gender',
      title: '性别',
      width: 80,
      render: gender => <GenderCol value={gender} />
    },
    {
      dataIndex: 'name',
      title: '名称',
      render: (name, entry) => (
        <TitleCol
          addon={get(entry, 'thirdParty.weixin.openid') && !entry.mobile && (
            <Tooltip title="微信注册用户">
              <Tag color="green">
                  <Icon type="wechat" />
              </Tag>
            </Tooltip>
          )}
          title={name}
          searchTitle={searchName}
          link={`/user/${entry._id}`}
          head={entry.mobile && <code>{formatMobile(entry.mobile)}</code>}
        />
      )
    },
    {
      dataIndex: 'registerAt',
      title: '注册时间',
      ...genSorter(query, 'registerAt'),
      width: 160,
      render: registerAt => <CreateAtCol value={registerAt} />
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
               to={`/user/${entry._id}/edit`}
               disabled={!com.hasPermission('UPDATE_USER')}
            />
          </ActionsCol>
        );
      }
    }
  ];
};
