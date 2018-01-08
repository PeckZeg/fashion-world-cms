import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import CardLayout from '../index';

import responsive from './responsive';
import styles from './styles.css';

export default class HeaderInfo extends PureComponent {
  /**
   *  `props` 类型检查
   *  @static
   */
  static propTypes = {
    margin: PropTypes.oneOf([
      'bottom'
    ]),
    gutter: PropTypes.number,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element
        ]),

        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element
        ])
      })
    ).isRequired
  };

  /**
   *  `props` 类型检查
   *  @static
   */
  static defaultProps = {
    gutter: 32,
    margin: 'bottom'
  };

  render() {
    const { gutter, margin, values } = this.props;
    const len = values.length;
    const colProps = responsive[len];

    return (
      <CardLayout margin={margin}>
        <Row className={styles.headerInfo} gutter={gutter}>
          {values.map(({ key, value }, idx) => (
            <Col key={key} {...colProps}>
              <h4>{key}</h4>
              <p>{value}</p>
              {idx < len - 1 && <em />}
            </Col>
          ))}
        </Row>
      </CardLayout>
    );
  }
}
