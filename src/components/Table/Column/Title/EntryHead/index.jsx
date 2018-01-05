import React, { PureComponent, } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';

import styles from './styles.css';

/**
 *  条目头
 *  @class
 */
export default class EntryHead extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   *  @property {boolean} coverVisible 是否显示封面
   *  @property {string} icon 图标
   *  @property {string} cover 封面地址
   *  @property {string} shape 封面图标形状 square|circle
   *  @property {string|ReactNode} title 标题
   *  @property {string} link 链接地址
   */
  static propTypes = {
    coverVisible: PropTypes.bool,
    icon: PropTypes.string,
    cover: PropTypes.string,
    shape: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    link: PropTypes.string
  };

  /**
   *  默认 `props`
   *  @static
   */
  static defaultProps = {
    icon: 'picture'
  };

  render() {
    const { coverVisible, icon, shape, cover, title, link } = this.props;

    return (
      <div className={styles.head}>
        {coverVisible && (
          <div className={styles.cover}>
            <Avatar
              shape={shape}
              icon={icon}
              size="small"
              src={toProcessImage(cover, { w: 64, h: 64 })}
            />
          </div>
        )}
        {link ? (
          <Link className={styles.title} to={link}>
            {title}
          </Link>
        ) : title}
      </div>
    );
  }
};
