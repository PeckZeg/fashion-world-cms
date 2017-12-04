import { Tag } from 'antd';
import React from 'react';

import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';

import TimelineModal from '~/src/components/TimelineModal';

import replace from '~/src/utils/array/replace';
import catchError from '~/src/utils/catchError';
import unshift from '~/src/utils/array/unshift';

const { Item } = TimelineModal;
const key = () => uniqueId('timeline');

export default async function(com, action, handleName, opts = {}) {
  let {
    entries,
    selectedRowKeys: selected,
    entryTitle,
    entryProp,
    entryNameProp
  } = com.state;
  let { timelineModal } = com;

  let completeEntries = [];
  let ignoreEntries = [];
  let failEntries = [];
  let timeline = [];

  await com.setStateAsync({
    timeline: unshift(timeline, (
      <Item key={key()}>
        共有 <code>{selected.length}</code> 个 {entryTitle}需要{action}
      </Item>
    ))
  });

  await timelineModal.setStateAsync({
    title: `${action}多个${entryTitle}`,
    closable: false,
    loading: true,
    visible: true
  });

  const { shouldIgnore } = opts;

  for (let entryId of selected) {
    const entry = find(entries, ['_id', entryId]);
    const { [entryNameProp]: name } = entry;

    if (isFunction(shouldIgnore) && shouldIgnore(entry)) {
      ignoreEntries.push(entryId);
      await com.setStateAsync({
        timeline: unshift(timeline, (
          <Item key={key()} color="#e9e9e9">
            忽略已{action}{entryTitle} <code>{name}</code>
          </Item>
        ))
      });
      continue;
    }

    await com.setStateAsync({
      timeline: unshift(timeline, (
        <Item key={key()}>
          正在{action}{entryTitle} <code>{name}</code>
        </Item>
      ))
    });

    try {
      const { [entryProp]: newEntry } = await com[handleName](entryId);

      completeEntries.push(entryId);

      await com.setStateAsync({
        entries: replace(entries, entry, newEntry),
        timeline: unshift(timeline, (
          <Item key={key()} color="green">
            成功{action}{entryTitle} <code>{name}</code>
          </Item>
        ))
      });
    }

    catch (err) {
      const { description } = catchError(this, err);

      failEntries.push(entryId);

      await com.setStateAsync({
        timeline: unshift(timeline, (
          <Item key={key()} color="red">
            {action}{entryTitle} <code>{name}</code> 失败
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
        complete={completeEntries.length}
        ignore={ignoreEntries.length}
        fail={failEntries.length}
      />
    ))
  });

  await com.setStateAsync({ selectedRowKeys: [] });

  await timelineModal.setStateAsync({
    closable: true,
    loading: false
  });
};
