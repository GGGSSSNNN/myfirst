"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = require('debug')('umi-plugin-pro-block');

function _default(api, opts = {}) {
  const paths = api.paths,
        config = api.config;
  debug('options', opts);
  let hasUtil, hasService, newFileName;
  api.beforeBlockWriting(({
    sourcePath,
    blockPath
  }) => {
    hasUtil = (0, _fs.existsSync)((0, _path.join)(paths.absSrcPath, `util${config.singular ? '' : 's'}`, 'request.js'));
    hasService = (0, _fs.existsSync)((0, _path.join)(sourcePath, './src/service.js'));
    newFileName = blockPath.replace(/^\//, '').replace(/\//g, '');
    debug('beforeBlockWriting... hasUtil:', hasUtil, 'hasService:', hasService, 'newFileName:', newFileName);
  });

  api._modifyBlockTarget((target, {
    sourceName
  }) => {
    if (sourceName === '_mock.js' && opts.moveMock !== false) {
      // src/pages/test/t/_mock.js -> mock/test-t.js
      return (0, _path.join)(paths.cwd, 'mock', `${newFileName}.js`);
    }

    if (sourceName === 'service.js' && hasService && opts.moveService !== false) {
      // src/pages/test/t/service.js -> services/test.t.js
      return (0, _path.join)(paths.absSrcPath, config.singular ? 'service' : 'services', `${newFileName}.js`);
    }

    return target;
  }); // umi-request -> @utils/request
  // src/pages/test/t/service.js -> services/test.t.js


  api._modifyBlockFile(content => {
    if (hasUtil && opts.modifyRequest !== false) {
      content = content.replace(/[\'\"]umi\-request[\'\"]/g, `'@/util${config.singular ? '' : 's'}/request'`);
    }

    if (hasService && opts.moveService !== false) {
      content = content.replace(/[\'\"][\.\/]+service[\'\"]/g, `'@/service${config.singular ? '' : 's'}/${newFileName}'`);
    }

    return content;
  });

  api._modifyBlockNewRouteConfig(memo => {
    if (opts.autoAddMenu === false) {
      return memo;
    }

    return _objectSpread({
      name: memo.path.split('/').pop(),
      icon: 'smile'
    }, memo);
  });
}