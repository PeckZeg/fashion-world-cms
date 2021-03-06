import React from 'react';

import PermissionsCol from '@table-column/Permissions';
import CreateAtCol from '@table-column/CreateAt';
import ActionsCol from '@table-column/Actions';
import StatusCol from '@table-column/Status';
import TitleCol from '@table-column/Title';
import CoverCol from '@table-column/Cover';

import genSorter from '~/src/utils/table/genSorter';

const { SwitchAction, EditLink } = ActionsCol;

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
      dataIndex: 'avatar',
      title: '头像',
      width: 80,
      render: (avatar, entry) => (
        <CoverCol
          icon="user"
          value={avatar}
          circular
          onClick={com.openImageViewer.bind(com, entry)}
        />
      )
    },
    {
      dataIndex: 'name',
      title: '登录名',
      width: 256,
      render: (name, entry) => (
        <TitleCol
          title={name}
          searchTitle={searchName}
          link={`/account/${entry._id}`}
        />
      )
    },
    {
      dataIndex: 'permissions',
      title: '权限',
      render: permissions => <PermissionsCol value={permissions} />
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
      render: (actions, entry) => {
        const disabled = !com.hasPermission('UPDATE_ACCOUNT');
        const more = (
          <ul>
            {/* <li>
              <Link to={`/account/${entry._id}/avatar`}>
                <Icon type="user" />
                编辑头像
              </Link>
            </li> */}
            <SwitchAction
              disabled={disabled}
              entry={entry}
              status={!entry.activeAt}
              yesLabel="激活"
              yesIcon="check"
              noIcon="lock"
              noLabel="冻结"
              onYesClick={com.activeEntry}
              onNoClick={com.blockEntry}
            />
            <SwitchAction
              disabled={disabled}
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
              to={`/account/${entry._id}/edit`}
              disabled={disabled}
            />
          </ActionsCol>
        );
      }
    }
  ];
};
