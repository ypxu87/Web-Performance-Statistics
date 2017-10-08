import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Welcome from './routes/welcome';
import Home from './routes/home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/welcome" exact component={Welcome} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
