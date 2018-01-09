import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import findIndex from 'lodash/findIndex';

import Definition from './Definition';

import { definitions } from '@const/video/definitions';

export default class Definitions extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { value } = this.props;

    return (
      <Fragment>
        {definitions.map(key => (
          <Definition
            key={key}
            label={key}
            exists={findIndex(value, ['definition', key]) > -1}
          />
        ))}
      </Fragment>
    );
  }
}
