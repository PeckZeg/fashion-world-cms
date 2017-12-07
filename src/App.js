import React, { PureComponent } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import MyLogin from '~/src/components/My/Login';
import Index from '~/src/components/Index';

import mapMyToProps from '~/src/utils/connect/mapMyToProps';

@connect(mapMyToProps)
export default class App extends PureComponent {
  render() {
    const { store, history, token } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
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
