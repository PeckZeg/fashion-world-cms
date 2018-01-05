import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import random from 'lodash/random';

import SelectSpinOption from '@components/SelectSpinOption';
import ChannelOption from './Option';

import mapMyToProps from '@util/connect/mapMyToProps';
import setTimeoutAsync from '@util/setTimeoutAsync';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';

const { Option: SelectOption } = Select;
const { Item: FormItem } = Form;
const DEFAULT_ENTRIES = [];

/**
 *  表单频道选择器
 *  @class
 */
@connect(mapMyToProps)
@injectApi('channel')
@injectProto('setStateAsync')
export default class FormChannelSelectItem extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    rules: PropTypes.arrayOf(PropTypes.object),
    initialValue: PropTypes.string,
    selectProps: PropTypes.object,
    notFoundContent: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    field: 'channelId',
    notFoundContent: '空空如也...',
    placeholder: '选择一个频道'
  };

  state = {
    fetching: false,
    searchName: null,

    entries: DEFAULT_ENTRIES,
    entryProp: 'channel',
    entriesProp: 'channels',
  };

  componentDidMount() {
    const { initialValue: channelId } = this.props;

    if (channelId) {
      this.fetchEntryList({ channelId });
    }
  }

  /**
   *  获取条目列表
   *  @this 绑定当前组件实例
   *  @param {object} [query] 查询列表
   *  @returns {Promise}
   */
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
  };

  /**
   *  焦点事件处理器
   *  @this 绑定当前组件实例
   */
  onFocus = () => isEmpty(this.state.entries) && this.fetchEntryList();

  /**
   *  选择事件处理器
   *  @this 绑定当前组件实例
   *  @param {string} selected 已选择的值
   */
  onSelect = selected => this.selected = selected;

  /**
   *  改变事件处理器
   *  @this 绑定当前组件实例
   *  @param {string} channelId 频道编号
   */
  onChange = channelId => {
    const { onChange } = this.props;
    const { entries } = this.state;

    if (channelId === void 0) {
      this.setState({ entries: DEFAULT_ENTRIES });
    }

    if (isFunction(onChange)) {
      onChange(channelId, entries.filter(({ _id }) => channelId === _id)[0]);
    }
  }

  /**
   *  搜索事件处理器
   *  @param {string} searchName 搜索的名称
   */
  onSearch = searchName => {
    if (!this.selected) {
      this.fetchEntryList({ searchName });
    }

    this.setState({ searchName });
    this.selected = null;
  }

  render() {
    const {
      form,
      rules, initialValue, selectProps,
      notFoundContent, placeholder,
      ...formItemProps
    } = this.props;
    const { fetching, entries, searchName } = this.state;
    const { getFieldDecorator } = form;
    const { field, ...extraFieldOpts } = isString(this.props.field) ?
        { field: this.props.field } : (this.props.field || {});

    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(field, {
          ...extraFieldOpts,
          rules,
          ...!isUndefined(initialValue) ? { initialValue } : null
        })(
          <Select
            showSearch
            allowClear
            filterOption={false}
            notFoundContent={fetching ? <SelectSpinOption /> : notFoundContent}
            placeholder={placeholder}
            onFocus={this.onFocus}
            onSearch={this.onSearch}
            onSelect={this.onSelect}
            onChange={this.onChange}
          >
            {entries.map(entry => (
              <SelectOption key={entry._id}>
                <ChannelOption entry={entry} searchName={searchName} />
              </SelectOption>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
};
