import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import styles from './styles.css';

@withRouter
export default class TableTitleColumn extends PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    desc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    link: PropTypes.string,
  };

  onLinkClick = e => {
    e.preventDefault();

    const link = e.target.getAttribute('href');

    if (link) {
      this.props.history.push(link);
    }
  }

  render() {
    const { title, desc, link } = this.props;

    return (
      <div className={styles.container}>
        <h4>
          {link ? (
            <a href={link} onClick={this.onLinkClick}>
              {title}
            </a>
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
