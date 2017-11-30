import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

export default class ImageViewerTitle extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string
  };

  static defaultProps = {
    icon: 'picture',
    title: '图片'
  };

  render() {
    const { title, icon, avatar } = this.props;

    return (
      <Fragment>
        <Avatar icon={icon} src={avatar} />
        {title}
      </Fragment>
    );
  }
}
