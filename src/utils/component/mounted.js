import isFunction from 'lodash/isFunction';

/**
 *  Component 增加 `mounted` 的装饰器
 */
export default function({ prototype }) {
  const { componentDidMount, componentWillUnmount } = prototype;

  prototype.componentDidMount = function(...args) {
    this.mounted = true;

    isFunction(componentDidMount) && componentDidMount.apply(this, args);
  };

  prototype.componentWillUnmount = function(...args) {
    this.mounted = false;
    isFunction(componentWillUnmount) && componentWillUnmount().apply(this, args);
  };
};
