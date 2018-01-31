import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import React, { PureComponent } from 'react';

import ClockOffCountDown from '@components/ClockOffCountDown';
import MyLogin from '@components/My/Login';
import Index from '@components/Index';

import mapMyToProps from '@util/connect/mapMyToProps';

@connect(mapMyToProps)
export default class App extends PureComponent {
  render() {
    const { store, history, token } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/clock-off"
              extect
              component={ClockOffCountDown}
            />
            <Route path="/my/login" exact component={MyLogin} />
            {!token ? (
              <Redirect to="/my/login" />
            ) : (
              <Route path="/" component={Index} />
            )}
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
