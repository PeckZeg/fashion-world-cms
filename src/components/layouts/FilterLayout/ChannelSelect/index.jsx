import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import random from 'lodash/random';

import SelectSpinOption from '@components/SelectSpinOption';
import ChannelOption from './Option';

import mapMyToProps from '@util/connect/mapMyToProps';
import setTimeoutAsync from '@util/setTimeoutAsync';
import stringifyQuery from '@util/query/stringify';
import injectProto from '@util/injectProto';
import parseQuery from '@util/query/parse';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';

const { Option: SelectOption } = Select;
const DEFAULT_ENTRIES = [];

/**
 *  频道选择器
 *  @class
 */
@connect(mapMyToProps)
@withRouter
@injectApi('channel')
@injectProto('setStateAsync')
export default class ChannelSelect extends PureComponent {
  static propTypes = {
    field: PropTypes.string.isRequired,
    width: PropTypes.number,
    notFoundContent: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    field: 'channelId',
    width: 213,
    notFoundContent: '空空如也...',
    placeholder: '过滤频道'
  };

  state = {
    fetching: false,

    entries: DEFAULT_ENTRIES,
    entryProp: 'channel',
    entriesProp: 'channels',
  };

  componentDidMount() {
    const { channelId } = parseQuery(this.props.location.search);

    if (channelId) {
      this.fetchEntryList({ channelId });
    }
  }

  fetchEntryList = async query => {
    const { entriesProp } = this.state;

    try {
      await this.setStateAsync({ fetching: true, entries: DEFAULT_ENTRIES });
      await setTimeoutAsync(random(128, 1024));
      const { [entriesProp]: entries } = await this.fetchChannelList(query);
      await this.setStateAsync({
        fetching: false,
        entries: isEmpty(entries) ? DEFAULT_ENTRIES : entries
      });
    }

    catch (err) {
      catchError(this, err, { loading: 'fetching' });
    }
  }

  /**
   *  焦点事件处理器
   */
  onFocus = () => isEmpty(this.state.entries) && this.fetchEntryList();

  /**
   *  选择事件处理器
   *  @param {string} selected 已选择的值
   */
  onSelect = selected => this.selected = selected;

  /**
   *  搜索事件处理器
   *  @param {string} searchName 搜索的名称
   */
  onSearch = searchName => {
    if (!this.selected) {
      this.fetchEntryList({ searchName });
    }

    this.selected = null;
  }

  /**
   *  改变事件处理器
   *  @param {string} channelId 频道编号
   */
  onChange = channelId => {
    const { location, history, match, field, onChange } = this.props;
    const { entries } = this.state;

    if (channelId === void 0) {
      this.setState({ entries: DEFAULT_ENTRIES });
    }

    if (isFunction(onChange)) {
      onChange(channelId, entries.filter(({ _id }) => channelId === _id)[0]);
    }

    const { search: prevSearch } = location;
    const search = stringifyQuery({
      ...parseQuery(prevSearch),
      [field]: channelId,
      ...channelId ? { offset: null, limit: null } : null
    });

    if (prevSearch !== search) {
      history.push(`${match.url}${search}`);
    }
  }

  render() {
    const { location, width, placeholder, notFoundContent } = this.props;
    const { channelId } = parseQuery(location.search);
    const { fetching, entries } = this.state;

    return (
      <Select
        showSearch
        allowClear={true}
        filterOption={false}
        // optionLabelProp="children"
        notFoundContent={fetching ? <SelectSpinOption /> : notFoundContent}
        placeholder={placeholder}
        style={{ width }}
        onFocus={this.onFocus}
        onSearch={this.onSearch}
        onSelect={this.onSelect}
        onChange={this.onChange}
        defaultValue={channelId}
      >
        {entries.map(entry => (
          <SelectOption key={entry._id}>
            <ChannelOption entry={entry} />
          </SelectOption>
        ))}
      </Select>
    );
  }
};
