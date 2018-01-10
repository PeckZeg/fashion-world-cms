import React, { PureComponent, Fragment } from 'react';
import { Tabs, Spin } from 'antd';
import Animate from 'rc-animate';

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

  render() {
    const { definition, ...tabPaneProps } = this.props;
    const { loading, status, avinfo } = this.state;

    return (
      <TabPane className={styles.tabpane} {...tabPaneProps}>
        <Animate
          component=""
          transitionName="fade"
          transitionAppear
          transitionLeave={false}
        >
          {loading ? <Spin key={this.animKeys.key('spin')} /> : (
            status === 'exception' ? (
              <Exception
                key={this.animKeys.key('exception')}
                className={styles.exception}
                type="500"
                desc="无法读取视频信息"
              />
            ) : (
              <Fragment>
                <DescList title="格式" key={this.animKeys.key('format')}>
                  {schema.format.map(({ key, label }) => (
                    <DescListItem key={key} label={label}>
                      <code>
                        {get(avinfo, `format.${key}`, '-')}
                      </code>
                    </DescListItem>
                  ))}
                </DescList>

                {schema.streams.map((stream, idx) => (
                  <DescList
                    title={`流 #${idx}`}
                    key={this.animKeys.key(`stream${idx}`)}
                  >
                    {stream.map(({ key, label }) => (
                      <DescListItem key={key} label={label}>
                        <code>
                          {get(avinfo, `streams[${idx}].${key}`, '-')}
                        </code>
                      </DescListItem>
                    ))}
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
