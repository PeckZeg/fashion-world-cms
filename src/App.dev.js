import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Index from '~/components/Index';

import mapMyToProps from '~/utils/connect/mapMyToProps';

@connect(mapMyToProps)
export default class App extends Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Index} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
