import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Icon, Select, Tag } from 'antd';

import stringifyQuery from '@util/query/stringify';
import parseQuery from '@util/query/parse';

import { GENDERS } from '@const/genders';

const { Option: SelectOption } = Select;

/**
 *  性别过滤器
 *  @class
 */
@withRouter
export default class GenderSelect extends PureComponent {
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
    field: 'gender',
    width: 128,
    placeholder: '过滤性别'
  };

  /**
   *  值变更事件处理器
   *  @this {React.Component} 当前组件实例
   *  @param {string} gender 值
   */
  onChange = gender => {
    const { location, history, match, field } = this.props;
    const { search: prevSearch } = location;
    const search = stringifyQuery({
      ...parseQuery(prevSearch),
      [field]: gender,
      ...gender ? { offset: null, limit: null } : null
    });

    if (prevSearch !== search) {
      history.push(`${match.url}${search}`);
    }
  };

  render() {
    const { field, width, placeholder } = this.props;
    const { [field]: gender } = parseQuery(this.props.location.search);

    return (
      <Select
        style={{ width }}
        onChange={this.onChange}
        placeholder={placeholder}
        defaultValue={gender}
        allowClear
      >
        {GENDERS.map(({ key, label, color, icon }) => (
          <SelectOption key={key}>
            <Tag color={color}>
              <Icon type={icon} />
            </Tag>
            {label}
          </SelectOption>
        ))}
      </Select>
    );
  }
};
