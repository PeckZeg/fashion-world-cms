import React, { PureComponent } from 'react';
import { Button, AutoComplete } from 'antd';

import isFunction from 'lodash/isFunction';
import toUpper from 'lodash/toUpper';
import assign from 'lodash/assign';

import injectProto from '@util/injectProto';
import languages from '@const/languages';
import extname from '@util/extname';

import styles from './styles.css';

@injectProto('setStateAsync')
export default class SubtitleFile extends PureComponent {
  static defaultProps = {
    placeholder: '字幕语言'
  };

  constructor(props) {
    super(props);

    const { value = {} } = props;
    const { url, key, lang } = value;

    this.state = {
      url,
      key,
      lang
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState(nextProps.value);
    }
  }

  /**
   *  选择器变更事件处理器
   *  @this 当前组件实例
   *  @param {string} 语言
   */
  onSelectChange = lang => {
    this.setState({ lang });
    this.onChange({ lang });
  }

  /**
   *  变更事件处理器
   *  @this 当前组件实例
   *  @param {object} value 变更的值
   */
  onChange = value => {
    const { onChange } = this.props;
    const { url, key, lang } = this.state;

    if (isFunction(onChange)) {
      onChange(assign({ url, key, lang }, value));
    }
  };

  render() {
    const { placeholder } = this.props;
    const { key, lang } = this.state;
    const ext = toUpper(extname(key));

    return (
      <div className={styles.subtitleFile}>
        <AutoComplete
          className={styles.language}
          showSearch
          value={lang}
          dataSource={languages}
          placeholder={placeholder}
          onChange={this.onSelectChange}
        />
        <Button
          className={styles.subtitle}
          icon="file-text"
        >
          {ext} 字幕
        </Button>
      </div>
    );
  }
}
