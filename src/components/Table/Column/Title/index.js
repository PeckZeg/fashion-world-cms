import Highlighter from 'react-highlight-words';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import isArray from 'lodash/isArray';

import styles from './styles.css';

@withRouter
export default class TableTitleColumn extends PureComponent {
  static propTypes = {
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
    const { desc, link } = this.props;
    const title = this.title();

    return (
      <div className={styles.container}>
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
