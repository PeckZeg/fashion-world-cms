import React, { PureComponent, Fragment } from 'react';
import { Icon, Upload, Spin } from 'antd';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Animate from 'rc-animate';

import isFunction from 'lodash/isFunction';
import isBoolean from 'lodash/isBoolean';
import random from 'lodash/random';

import UniqKey from '~/src/utils/UniqKey';

import toProcessImage from '~/src/utils/qiniu/toProcessImage';
import setTimeoutAsync from '~/src/utils/setTimeoutAsync';
import injectProto from '~/src/utils/injectProto';
import styles from './styles.css';

const { Dragger } = Upload;

@injectProto('setStateAsync')
export default class ImageUploader extends PureComponent {
  static propTypes = {
    tip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    image: PropTypes.string,
    customRequest: PropTypes.func
  };

  static defaultProps = {
    w: null,
    h: null,
    tip: (
      <Fragment>
        只能上传图片文件，并且不超过 <code>2 MB</code>
      </Fragment>
    )
  };

  uniqKey = new UniqKey();

  state = {
    disabled: false,
    uploading: false,
    result: null,
    resultDesc: null,
  };

  componentDidMount() {
    const $dragger = findDOMNode(this);
    const { offsetWidth: w, offsetHeight: h } = $dragger;

    this.setState({ w, h });
  }

  /**
   *  开始上传事件处理器
   */
  onStart = () => {
    this.setState({
      disabled: true,
      uploading: true,
      result: null,
      resultDesc: null
    });
  }

  /**
   *  成功事件处理器
   */
  onSuccess = async () => {
    await this.setState({
      disabled: false,
      uploading: false,
      result: true,
      resultDesc: '上传成功'
    });

    await setTimeoutAsync(random(1024, 3072));

    if (this.state.result === true) {
      await this.setStateAsync({ result: null, resultDesc: null });
    }
  }

  /**
   *  错误事件处理器
   *  @param {Error} err 错误实例
   */
  onError = err => this.setState({
    disabled: false,
    uploading: false,
    result: false,
    resultDesc: err.message
  });

  /**
   *  自定义请求
   */
  customRequest = customRequest => {
    if (isFunction(this.props.customRequest)) {
      this.props.customRequest(this, customRequest);
    }
  }

  /**
   *  渲染提示
   */
  renderTip() {
    const { image, tip } = this.props;
    const hasWrapper = !!image;
    const children = (
      <div className={styles.tip}>
        <h3>
          <Icon type="inbox" />
        </h3>
        <h4>
          猛击或拖拽文件到该区域
        </h4>
        <p>
          {tip}
        </p>
      </div>
    );

    return hasWrapper ? (
      <div className={styles.tipWrapper}>
        {children}
      </div>
    ) : children;
  }

  /**
   *  渲染上传结果
   */
  renderResult() {
    const { result, resultDesc } = this.state;
    const { uniqKey } = this;

    return (
      <Animate
        component=""
        transitionName="fade"
        transitionAppear
      >
        {isBoolean(result) ? (
          <div className={styles.resultWrapper} key={uniqKey.key('result')}>
            <div className={styles.result}>
              <h3 className={result ? styles.success : styles.error}>
                <Icon type={result ? 'check-circle' : 'close-circle'} />
              </h3>
              <p>
                {resultDesc}
              </p>
            </div>
          </div>
        ) : null}
      </Animate>
    );
  }

  render() {
    const { image } = this.props;
    const { disabled, uploading, w, h } = this.state;
    const tip = this.renderTip();
    const result = this.renderResult();
    const customRequest = this.props.customRequest && this.customRequest;

    return (
      <Dragger
        className={styles.dragger}
        showUploadList={false}
        disabled={disabled}
        customRequest={customRequest}
      >
        <div className={styles.container}>
          {!uploading && image && tip}

          {result}

          {uploading && (
            <div className={styles.spin}>
              <Spin />
            </div>
          )}

          <div className={styles.main}>
            {w && h && image ? (
              <img
                className={styles.preview}
                src={toProcessImage(image, { mode: 2, w, h })}
                alt=""
              />
            ) :tip}
          </div>
        </div>
      </Dragger>
    );
  }
}
