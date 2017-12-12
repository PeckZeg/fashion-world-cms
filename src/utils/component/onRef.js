import isFunction from 'lodash/isFunction';

export default function({ prototype }) {
  const { componentDidMount } = prototype;

  prototype.componentDidMount = function() {
    if (isFunction(this.props.onRef)) {
      this.props.onRef(this);
    }

    if (isFunction(componentDidMount)) {
      componentDidMount(this, arguments);
    }
  };
};
