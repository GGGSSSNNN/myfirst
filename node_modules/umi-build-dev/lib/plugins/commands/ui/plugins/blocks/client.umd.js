(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('dva')) :
  typeof define === 'function' && define.amd ? define(['react', 'dva'], factory) :
  (global = global || self, (global.g_umiUIPlugins = global.g_umiUIPlugins || {}, global.g_umiUIPlugins.blocks = factory(global.React, global.dva)));
}(this, function (React, dva) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  var BlocksViewer = dva.connect(function (state) {
    return {
      blocks: state.blocks
    };
  })(function (props) {
    function addHandler(name) {
      window.send('blocks', [name]);
    }

    return React.createElement("div", null, React.createElement("h2", null, "Search"), React.createElement("h2", null, "List"), React.createElement("ul", null, props.blocks.data.map(function (item) {
      return React.createElement("li", {
        key: item.name
      }, item.name, React.createElement("button", {
        onClick: addHandler.bind(null, item.name)
      }, "add"));
    })));
  });
  var client = (function (api) {
    api.addPanel({
      title: 'Blocks Viewer',
      path: '/blocks',
      component: BlocksViewer,
      models: [require('./model').default]
    });
  });

  return client;

}));
