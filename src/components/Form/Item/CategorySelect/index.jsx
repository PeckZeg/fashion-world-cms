import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import random from 'lodash/random';
import isNil from 'lodash/isNil';

import SelectSpinOption from '@components/SelectSpinOption';
import CategoryOption from './Option';

import mapMyToProps from '@util/connect/mapMyToProps';
import setTimeoutAsync from '@util/setTimeoutAsync';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import injectApi from '@util/injectApi';

const { Option: SelectOption } = Select;
const { Item: FormItem } = Form;
const DEFAULT_ENTRIES = [];

/**
 *  表单分类选择器
 *  @class
 */
@connect(mapMyToProps)
@injectApi('category')
@injectProto('setStateAsync')
export default class FormCategorySelectItem extends PureComponent {
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
    onChange: PropTypes.func,
    channelId: PropTypes.string,
  };

  /**
   *  `props` 默认值
   *  @static
   */
  static defaultProps = {
    field: 'categoryId',
    notFoundContent: '空空如也...',
    placeholder: '选择一个分类'
  };

  state = {
    fetching: false,
    searchName: null,

    entries: DEFAULT_ENTRIES,
    entryProp: 'category',
    entriesProp: 'categories',
  };

  componentDidMount() {
    const { initialValue: categoryId } = this.props;

    if (categoryId) {
      this.fetchEntryList(this.query({ categoryId }));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { channelId } = nextProps;
    const { channelId: prevChannelId } = this.props;

    if (channelId !== prevChannelId) {
      this.setState({
        channelId,
        ...!channelId ? { entries: DEFAULT_ENTRIES } : null
      });

      if (!channelId) {
        const { form } = this.props;
        const { setFieldsValue } = form;
        const field = isString(this.props.field) ?
            this.props.field : this.props.field.field;

        setFieldsValue({ [field]: void 0 });
      }
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
      const { [entriesProp]: entries } = await this.fetchCategoryList(query);
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
  onFocus = () => {
    isEmpty(this.state.entries) && this.fetchEntryList(this.query());
  }

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
  onChange = categoryId => {
    const { onChange } = this.props;
    const { entries } = this.state;

    if (categoryId === void 0) {
      this.setState({ entries: DEFAULT_ENTRIES });
    }

    if (onChange) {
      const category = entries.filter(({ _id }) => categoryId === _id)[0];
      const { channel } = category || {};
      onChange(channel._id, categoryId, channel, category);
    }
  }

  /**
   *  搜索事件处理器
   *  @param {string} searchName 搜索的名称
   */
  onSearch = searchName => {
    if (!this.selected) {
      this.fetchEntryList(this.query({ searchName }));
    }

    this.setState({ searchName });
    this.selected = null;
  }

  /**
   *  生成查询条件
   *  @param {object} [query] 查询条件
   *  @returns {object}
   */
  query = query => {
    const { channelId } = this.props;

    return {
      ...query,
      ...channelId ? { channelId } : null
    };
  };

  render() {
    const {
      channelId, form,
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
          ...!isNil(initialValue) ? { initialValue } : null
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
                <CategoryOption entry={entry} searchName={searchName} />
              </SelectOption>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
};
