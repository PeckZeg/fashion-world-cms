import React, { Fragment } from 'react';
import { Tag } from 'antd';

import find from 'lodash/find';

import createItem from '~/src/components/TimelineModal/createItem';
import replace from '~/src/utils/array/replace';
import catchError from '~/src/utils/catchError';
import unshift from '~/src/utils/array/unshift';

export default async function(com) {
  let { entries, selectedRowKeys, entryTitle, entryProp } = com.state;
  let { timelineModal } = com;

  let successEntries = [];
  let ignoreEntries = [];
  let errorEntries = [];
  let timeline = [];

  await com.setStateAsync({
    timeline: unshift(timeline, createItem(
      <Fragment>
        共有 <code>{selectedRowKeys.length}</code> 个账号需要冻结
      </Fragment>
    ))
  });

  await timelineModal.setStateAsync({
    closable: false,
    loading: true,
    visible: true
  });

  for (let entryId of selectedRowKeys) {
    const entry = find(entries, ['_id', entryId]);

    if (!entry.activeAt) {
      ignoreEntries.push(entryId);
      await com.setStateAsync({
        timeline: unshift(timeline, createItem({ color: '#e9e9e9' }, (
          <Fragment>
            忽略已冻结{entryTitle} <code>{entry.name}</code>
          </Fragment>
        )))
      });
      continue;
    }

    await com.setStateAsync({
      timeline: unshift(timeline, createItem(
        <Fragment>
          正在已冻结{entryTitle} <code>{entry.name}</code>
        </Fragment>
      ))
    });

    try {

    }

    catch (err) {
      const { description } = catchError(com, err);

      errorEntries.push(entryId);

      await com.setStateAsync({
        timeline: unshift(timeline, createItem({ color: 'red' }, (
          <Fragment>
            冻结{entryTitle} <code>{entry.name}</code> 失败
            <p>
              <Tag>原因</Tag> <code>{description}</code>
            </p>
          </Fragment>
        )))
      });
    }
  }

  await com.setStateAsync({
    timeline: unshift(timeline, createItem(
      <Fragment>
        处理完毕！
        <ul>
          <li>
            <Tag color="cyan">成功</Tag>
            <code>{successEntries.length}</code>
          </li>
          <li>
            <Tag color="red">失败</Tag>
            <code>{errorEntries.length}</code>
          </li>
          <li>
            <Tag>忽略</Tag>
            <code>{ignoreEntries.length}</code>
          </li>
        </ul>
      </Fragment>
    ))
  });

  await timelineModal.setStateAsync({  closable: true, loading: false });
};
