import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/yohan/myfirst/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/yohan/myfirst/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "path": "/welcome",
        "name": "welcome",
        "icon": "smile",
        "component": _dvaDynamic({
  
  component: () => import('../Welcome'),
  LoadingComponent: require('/Users/yohan/myfirst/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/one",
        "name": "one",
        "component": _dvaDynamic({
  
  component: () => import('../One'),
  LoadingComponent: require('/Users/yohan/myfirst/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/two",
        "name": "two",
        "component": _dvaDynamic({
  
  component: () => import('../Two'),
  LoadingComponent: require('/Users/yohan/myfirst/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/three",
        "name": "three",
        "component": _dvaDynamic({
  
  component: () => import('../Three'),
  LoadingComponent: require('/Users/yohan/myfirst/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "https://github.com/umijs/umi-blocks/tree/master/ant-design-pro",
        "name": "more-blocks",
        "icon": "block",
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/yohan/myfirst/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/yohan/myfirst/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
