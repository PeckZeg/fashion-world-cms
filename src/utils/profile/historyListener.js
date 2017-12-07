import { matchPath } from 'react-router';

import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import forEach from 'lodash/forEach';
import assign from 'lodash/assign';

import { routeKeys } from '~/src/const/siders';

export default function(...handlers) {
  return function({ prototype }) {
    const {
      componentDidMount, componentWillUnmount, componentDidUpdate
    } = prototype;


    assign(prototype, {
      componentDidMount(...args) {
        const { entryIdProp } = this.state;
        const historyListener = this.props.history.listen(location => {
          // console.log(location);
          let match;


          forEach(routeKeys, (key, path) => {
            match = matchPath(location.pathname, { path });

            if (match) {
              return false;
            }
          });

          if (match) {
            const { params: { [entryIdProp]: entryId } } = match;

            this.setState({ entryId });
          }

          forEach(handlers, handler => {
            if (isString(handler)) {
              handler = this[handler];
            }

            if (isFunction(handler)) {
              handler({ location, match });
            }
          });
        });

        this.setState({ historyListener }, () => {
          if (isFunction(this.fetchEntry)) {
            this.fetchEntry();
          }
        });

        if (isFunction(componentDidMount)) {
          componentDidMount.apply(this, args);
        }
      },

      componentDidUpdate(prevProps, prevState) {
        const { entryId: prevEntryId } = prevState;
        const { entryId } = this.state;

        if (prevEntryId !== entryId && isFunction(this.fetchEntry)) {
          this.fetchEntry();
        }

        if (isFunction(componentDidUpdate)) {
          componentDidUpdate.call(this, prevProps, prevState);
        }
      },

      componentWillUnmount(...args) {
        const { historyListener } = this.state;

        if (isFunction(historyListener)) {
          historyListener();
          this.setState({ historyListener: null });
        }

        if (isFunction(componentWillUnmount)) {
          componentWillUnmount.apply(this, args);
        }
      }
    });
  };
};
