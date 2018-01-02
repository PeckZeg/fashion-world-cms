import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import camelCase from 'lodash/camelCase';

import stringifyQuery from '@util/query/stringify';
import parseQuery from '@util/query/parse';

const { Search } = Input;

/**
 *  文本搜索框
 *  @class
 */
@withRouter
export default class InputSearch extends PureComponent {
  /**
   *  `props` 类型检查
   *  @property {string} [field = "name"] 字段
   *  @property {number} [width = 256] 搜索框宽度
   *  @property {string} [placeholder = "输入点什么吧"] 占位文本
   */
  static propTypes = {
    field: PropTypes.string.isRequired,
    width: PropTypes.number,
    placeholder: PropTypes.string
  };

  /**
   *  `props` 默认值
   */
  static defaultProps = {
    field: 'name',
    width: 256,
    placeholder: '输入点什么吧'
  };

  /**
   *  搜索事件处理器
   *  @this {React.Component} 当前组件实例
   *  @param {string} value 搜索的文本
   */
  onSearch = value => {
    const { location, history, match } = this.props;
    const { search: prevSearch } = location;
    const field = camelCase(`search-${this.props.field}`);
    const search = stringifyQuery({
      ...parseQuery(prevSearch),
      [field]: value,
      ...value ? { offset: null, limit: null } : null
    });

    if (prevSearch !== search) {
      history.push(`${match.url}${search}`);
    }
  }

  render() {
    const { width, placeholder } = this.props;
    const field = camelCase(`search-${this.props.field}`);
    const { [field]: value } = parseQuery(this.props.location.search);

    return (
      <Search
        style={{ width }}
        defaultValue={value}
        placeholder={placeholder}
        onSearch={this.onSearch}
      />
    );
  }
};
