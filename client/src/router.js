import React from 'react';
import { Router, Route } from 'dva/router';
import Welcome from './routes/welcome';
import Home from './routes/home';
import App from './app';
const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
};
function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/app'));
          cb(null, { component: require('./routes/welcome') });
        });
      },
      childRoutes: [
        {
          path: '/home',
          name: 'home',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'));
              cb(null, require('./routes/home'));
            });
          },
        }, {
          path: '/welcome',
          name: 'welcome',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'));
              cb(null, require('./routes/welcome'));
            });
          },
        },
      ],
    },
  ];
  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
