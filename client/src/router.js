import React from 'react';
import { Router, Route } from 'dva/router';
import Welcome from './routes/welcome';
import Home from './routes/home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/welcome" exact component={Welcome} />
      <Route path="/" exact component={Home} />
    </Router>
  );
}

export default RouterConfig;
