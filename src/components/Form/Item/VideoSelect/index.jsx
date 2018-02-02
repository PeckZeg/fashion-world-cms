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
import VideoOption from './Option';

import mapMyToProps from '@util/connect/mapMyToProps';
import setTimeoutAsync from '@util/setTimeoutAsync';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';

const { Option: SelectOption } = Select;
const { Item: FormItem } = Form;
const DEFAULT_ENTRIES = [];

/**
 *  视频选择器
 *  @class
 */
@connect(mapMyToProps)
@injectApi('video')
@injectProto('setStateAsync')
export default class VideoSelect extends PureComponent {
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
    notFoundContent: PropTypes.node,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    field: 'videoId',
    notFoundContent: '空空如也...',
    placeholder: '选择一个视频'
  };

  state = {
    fetching: false,
    searchTitle: null,

    entries: DEFAULT_ENTRIES,
    entryProp: 'video',
    entriesProp: 'videos',
  };

  componentDidMount() {
    const { initialValue: videoId } = this.props;

    if (videoId) {
      this.fetchEntryList({ videoId });
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
      const { [entriesProp]: entries } = await this.fetchVideoList(query);
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
   *  @param {string} videoId 视频编号
   */
  onChange = videoId => {
    const { onChange } = this.props;
    const { entries } = this.state;

    if (videoId === void 0) {
      this.setState({ entries: DEFAULT_ENTRIES });
    }

    if (isFunction(onChange)) {
      onChange(videoId, entries.filter(({ _id }) => videoId === _id)[0]);
    }
  }

  /**
   *  搜索事件处理器
   *  @param {string} searchTitle 搜索的名称
   */
  onSearch = searchTitle => {
    if (!this.selected) {
      this.fetchEntryList({ searchTitle });
    }

    this.setState({ searchTitle });
    this.selected = null;
  }

  render() {
    const {
      form,
      rules, initialValue, selectProps,
      notFoundContent, placeholder,
      ...formItemProps
    } = this.props;
    const { fetching, entries, searchTitle } = this.state;
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
                <VideoOption entry={entry} searchTitle={searchTitle} />
              </SelectOption>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
};
