import React, { PureComponent } from 'react';
import { Icon, Tag, Tooltip } from 'antd';

import { getGender } from '@const/genders';

import styles from './styles.css';

export default class TableGenderColumn extends PureComponent {
  render() {
    const { label, color, icon } = getGender(this.props.value);

    return (
      <div className={styles.container}>
        <Tooltip title={label}>
          <Tag color={color}>
              <Icon type={icon} />
          </Tag>
        </Tooltip>
      </div>
    );
  }
}
