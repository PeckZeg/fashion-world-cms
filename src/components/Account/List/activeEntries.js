import { Tag } from 'antd';
import React from 'react';

import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';

import TimelineModal from '~/src/components/TimelineModal';

import replace from '~/src/utils/array/replace';
import catchError from '~/src/utils/catchError';
import unshift from '~/src/utils/array/unshift';

const { Item } = TimelineModal;
const key = () => uniqueId('timeline');
const action = '激活';

export default async function(com) {
  let { entries, selectedRowKeys, entryTitle, entryProp } = com.state;
  let { timelineModal } = com;

  let successEntries = [];
  let ignoreEntries = [];
  let errorEntries = [];
  let timeline = [];

  await com.setStateAsync({
    timeline: unshift(timeline, (
      <Item key={key()}>
        共有 <code>{selectedRowKeys.length}</code> 个${entryTitle}需要{action}
      </Item>
    ))
  });

  await timelineModal.setStateAsync({
    closable: false,
    loading: true,
    visible: true
  });

  for (let entryId of selectedRowKeys) {
    const entry = find(entries, ['_id', entryId]);

    if (entry.activeAt) {
      ignoreEntries.push(entryId);
      await com.setStateAsync({
        timeline: unshift(timeline, (
          <Item key={key()} color="#e9e9e9">
            忽略已{action}{entryTitle} <code>{entry.name}</code>
          </Item>
        ))
      });
      continue;
    }

    await com.setStateAsync({
      timeline: unshift(timeline, (
        <Item key={key()}>
          正在{action}{entryTitle} <code>{entry.name}</code>
        </Item>
      ))
    });

    try {
      const { [entryProp]: newEntry } = await com.activeAccount(entryId);

      successEntries.push(entryId);

      await com.setStateAsync({
        entries: replace(entries, entry, newEntry),
        timeline: unshift(timeline, (
          <Item key={key()} color="green">
            成功{action}{entryTitle} <code>{entry.name}</code>
          </Item>
        ))
      });
    }

    catch (err) {
      const { description } = catchError(this, err);

      errorEntries.push(entryId);

      await com.setStateAsync({
        timeline: unshift(timeline, (
          <Item key={key()} color="red">
            {action}{entryTitle} <code>{entry.name}</code> 失败
            <p>
              <Tag>原因</Tag> <code>{description}</code>
            </p>
          </Item>
        ))
      });
    }
  }

  await com.setStateAsync({
    timeline: unshift(timeline, (
      <Item
        key={key()}
        complete={successEntries.length}
        fail={errorEntries.length}
        ignore={ignoreEntries.length}
      />
    ))
  });

  await timelineModal.setStateAsync({  closable: true, loading: false });
};
