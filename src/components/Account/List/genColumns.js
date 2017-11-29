import React from 'react';
import { Button } from 'antd';

import SwitchAction from '@table-column/Actions/SwitchAction';
import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status';
import TitleCol from '@table-column/Title';

import genSorter from '~/src/utils/table/genSorter';

export default function(com, query) {
  return [
    {
      dataIndex: 'status',
      title: '状态',
      width: 64,
      render: (_, entry) => (
        <StatusCol
          publishAt={entry.activeAt}
          removeAt={entry.removeAt}
        />
      )
    },
    // {
    //   dataIndex: '_id',
    //   title: '编号',
    //   // width: 213,
    //   render: _id => <code>{_id}</code>
    // },
    {
      dataIndex: 'name',
      title: '登录名',
      width: 256,
      render: (name, entry) => (
        <TitleCol title={name} link={`/account/${entry._id}`} />
      )
    },
    {
      dataIndex: 'permissions',
      title: '权限',
      render: permissions => JSON.stringify(permissions)
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
      render: (_, entry) => (
        <ActionsCol
          entry={entry}
          moreContent={(
            <ul>
              <SwitchAction
                status={!entry.activeAt}
                // yesType="default"
                yesLabel="激活"
                yesIcon="check"
                // noType="danger"
                noIcon="lock"
                noLabel="冻结"
              />
              <SwitchAction
                status={!entry.removeAt}
                yesType="danger"
                yesLabel="删除"
                yesIcon="delete"
                noType="default"
                noIcon="rollback"
                noLabel="恢复"
              />
            </ul>
          )}
        />
      )
    }
  ];
};
