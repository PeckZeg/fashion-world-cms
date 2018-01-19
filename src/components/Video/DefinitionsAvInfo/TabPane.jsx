import React, { PureComponent, Fragment } from 'react';
import { Tabs, Spin } from 'antd';
import Animate from 'rc-animate';

import isFunction from 'lodash/isFunction';
import random from 'lodash/random';
import get from 'lodash/get';

import Exception from 'ant-design-pro/lib/Exception';
import DescList from '@components/DescList';
import UniqKey from '@util/UniqKey';

import setTimeoutAsync from '@util/setTimeoutAsync';
import fetchAvinfo from '@util/qiniu/fetchAvinfo';
import injectProto from '@util/injectProto';
import catchError from '@util/catchError';
import * as schema from './schema';
import styles from './styles.css';

const { Item: DescListItem } = DescList;
const { TabPane } = Tabs;

/**
 *  视频信息标签面板
 *  @class
 */
@injectProto('setStateAsync')
export default class AvInfoTabPane extends PureComponent {
  state = {
    inited: false,
    loading: true,
    avinfo: null,
    status: null
  };

  /**
   *  动画键
   */
  animKeys = new UniqKey();

  /**
   *  加载视频信息
   *  @this 当前组件实例
   *  @returns {Promise}
   */
  load = async () => {
    const { definition } = this.props;
    const { inited } = this.state;

    if (!inited) {
      try {
        await this.setStateAsync({ loading: true, status: null, avinfo: null });
        const avinfo = await fetchAvinfo(definition.url);
        await setTimeoutAsync(random(256, 1024));
        await this.setStateAsync({ loading: false, status: 'success', avinfo });
      }

      catch (err) {
        catchError(this, err);
        await this.setStateAsync({ loading: false, status: 'exception' });
      }

      finally {
        await this.setStateAsync({ inited: true });
      }
    }
  }

  renderItems = (pathPrefix, items) => items.map(({ key, label, format }) => {
    const value = get(this.state.avinfo, `${pathPrefix}.${key}`, '-');

    return (
      <DescListItem key={key} label={label}>
        <code>
          {isFunction(format) ? format(value) : value}
        </code>
      </DescListItem>
    );
  });

  render() {
    const { definition, ...tabPaneProps } = this.props;
    const { loading, status } = this.state;
    const { animKeys, renderItems } = this;

    return (
      <TabPane className={styles.tabpane} {...tabPaneProps}>
        <Animate
          component=""
          transitionName="fade"
          transitionAppear
          transitionLeave={false}
        >
          {loading ? <Spin key={animKeys.key('spin')} /> : (
            status === 'exception' ? (
              <Exception
                key={animKeys.key('exception')}
                className={styles.exception}
                type="500"
                desc="无法读取视频信息"
              />
            ) : (
              <Fragment>
                <DescList title="格式" key={animKeys.key('format')}>
                  {renderItems('format', schema.format)}
                </DescList>

                {schema.streams.map((stream, idx) => (
                  <DescList
                    title={`流 #${idx}`}
                    key={animKeys.key(`stream${idx}`)}
                  >
                    {renderItems(`streams[${idx}]`, stream)}
                  </DescList>
                ))}
              </Fragment>
            )
          )}
        </Animate>
      </TabPane>
    );
  }
};
