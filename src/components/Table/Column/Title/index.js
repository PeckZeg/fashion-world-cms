import Highlighter from 'react-highlight-words';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import isArray from 'lodash/isArray';

import styles from './styles.css';

/**
 *  表格标题栏
 *  @class
 */
@withRouter
export default class TableTitleColumn extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   *  @property {string|ReactNode} head
   *  @property {string|ReactNode} title
   *  @property {string|string[]} searchTitle
   *  @property {string|ReactNode} desc
   *  @property {string} link
   */
  static propTypes = {
    head: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    searchTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),

    desc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    link: PropTypes.string,
  };

  /**
   *  渲染标题
   */
  title() {
    const { title, searchTitle } = this.props;

    return searchTitle ? (
      <Highlighter
        textToHighlight={title}
        searchWords={isArray(searchTitle) ? searchTitle : [searchTitle]}
      />
    ) : title;
  }

  render() {
    const { desc, link, head } = this.props;
    const title = this.title();

    return (
      <div className={styles.container}>
        {head && <div className={styles.head}>{head}</div>}
        <h4>
          {link ? (
            <Link to={link}>
              {title}
            </Link>
          ) : title}
        </h4>
        {desc && (
          <div className={styles.desc}>
            {desc}
          </div>
        )}
      </div>
    );
  }
}
