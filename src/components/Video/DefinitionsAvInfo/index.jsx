import React, { PureComponent } from 'react';
import { Tabs } from 'antd';

import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import get from 'lodash/get';

import Exception from 'ant-design-pro/lib/Exception';
import TabPane from './TabPane';

import { definitionsReverse as DEFINITIONS } from '@const/video/definitions';
import styles from './styles.css';

export default class DefinitionsAvInfo extends PureComponent {
  componentDidMount() {
    const { definitions } = this.props;
    const definition = get(definitions, '[0].definition');
    const tabPane = this.tabPanes[definition];

    if (tabPane) {
      tabPane.load();
    }
  }

  /**
   *  引用绑定
   *  @param {string} definition 清晰度
   *  @param {Reac.Component} tabPane 标签面板实例
   */
  ref = (definition, tabPane) => {
    (this.tabPanes = this.tabPanes || {})[definition] = tabPane;
  }

  /**
   *  值改变处理器
   *  @param {string} definition
   */
  onChange = definition => {
    const tabPane = this.tabPanes[definition];

    if (tabPane) {
      tabPane.load();
    }
  }

  render() {
    const { definitions } = this.props;

    if (isEmpty(definitions)) {
      return (
        <Exception
          className={styles.exception}
          type="404"
          desc="暂无该视频信息"
        />
      );
    }

    return (
      <Tabs
        defaultActiveKey={get(definitions, '[0].definition')}
        tabPosition="left"
        onChange={this.onChange}
      >
        {DEFINITIONS.map(key => (
          <TabPane
            tab={key}
            key={key}
            ref={this.ref.bind(this, key)}
            disabled={findIndex(definitions, ['definition', key]) < 0}
            definition={filter(definitions, ['definition', key])[0]}
          />
        ))}
      </Tabs>
    );
  }
};
