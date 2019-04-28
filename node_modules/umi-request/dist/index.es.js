import 'whatwg-fetch';
import { stringify } from 'query-string';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

/**
 * 注册request拦截器
 * get 和 post 参数简化
 * post:
 * @param {json|form} requestType 数据的传输方式, 对应Content-Type, 覆盖常见的两种场景, 自动带上header和格式化数据.
 * @param {object} data 数据字段
 *
 * get:
 * @param {object} params query参数
 */

var defaultInterceptor = (function (url) {
  var originOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var options = objectSpread({}, originOptions); // 默认get, 兼容method大小写


  var method = options.method || "get";
  method = method.toLowerCase();

  if (method === "post" || method === "put" || method === "patch") {
    // requestType 简写默认值为 json
    var _options$requestType = options.requestType,
        requestType = _options$requestType === void 0 ? "json" : _options$requestType,
        data = options.data; // 数据使用类axios的新字段data, 避免引用后影响旧代码, 如将body stringify多次

    if (data) {
      var dataType = Object.prototype.toString.call(data);

      if (dataType === "[object Object]" || dataType === "[object Array]") {
        if (requestType === "json") {
          options.headers = objectSpread({
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
          }, options.headers);
          options.body = JSON.stringify(data);
        } else if (requestType === "form") {
          options.headers = objectSpread({
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }, options.headers);
          options.body = stringify(data);
        }
      } else {
        // 其他 requestType 自定义header
        options.headers = objectSpread({
          Accept: "application/json"
        }, options.headers);
        options.body = data;
      }
    }
  } // 支持类似axios 参数自动拼装, 其他method也可用, 不冲突.


  if (options.params && Object.keys(options.params).length > 0) {
    var str = url.indexOf("?") !== -1 ? "&" : "?";
    url = "".concat(url).concat(str).concat(stringify(options.params));
  }

  return {
    url: url,
    options: options
  };
});

var requestInterceptors = [];
var responseInterceptors = [];

function fetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof url !== "string") throw new Error("url MUST be a string"); // 执行 request 的拦截器

  requestInterceptors.concat([defaultInterceptor]).forEach(function (handler) {
    var ret = handler(url, options);
    url = ret.url || url;
    options = ret.options || options;
  }); // 将 method 改为大写

  options.method = options.method ? options.method.toUpperCase() : "GET"; // 请求数据

  var response = window.fetch(url, options); // 执行 response 的拦截器

  responseInterceptors.forEach(function (handler) {
    response = response.then(function (res) {
      return handler(res, options);
    });
  });
  return response;
} // 支持拦截器，参考 axios 库的写法: https://github.com/axios/axios#interceptors


fetch.interceptors = {
  request: {
    use: function use(handler) {
      requestInterceptors.push(handler);
    }
  },
  response: {
    use: function use(handler) {
      responseInterceptors.push(handler);
    }
  }
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

var isNativeFunction = _isNativeFunction;

var construct = createCommonjsModule(function (module) {
function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
});

var wrapNativeSuper = createCommonjsModule(function (module) {
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
});

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

/**
 * 实现一个简单的Map cache, 稍后可以挪到 utils中, 提供session local map三种前端cache方式.
 * 1. 可直接存储对象   2. 内存无5M限制   3.缺点是刷新就没了, 看反馈后期完善.
 */
var MapCache =
/*#__PURE__*/
function () {
  function MapCache(options) {
    classCallCheck(this, MapCache);

    this.cache = new Map();
    this.timer = {};
    this.maxCache = options.maxCache || 0;
  }

  createClass(MapCache, [{
    key: "get",
    value: function get(key) {
      return this.cache.get(JSON.stringify(key));
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var _this = this;

      var ttl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60000;

      // 如果超过最大缓存数, 删除头部的第一个缓存.
      if (this.maxCache > 0 && this.cache.size >= this.maxCache) {
        var deleteKey = toConsumableArray(this.cache.keys())[0];

        this.cache.delete(deleteKey);

        if (this.timer[deleteKey]) {
          clearTimeout(this.timer[deleteKey]);
        }
      }

      var cacheKey = JSON.stringify(key);
      this.cache.set(cacheKey, value);

      if (ttl > 0) {
        this.timer[cacheKey] = setTimeout(function () {
          _this.cache.delete(cacheKey);

          delete _this.timer[cacheKey];
        }, ttl);
      }
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      var cacheKey = JSON.stringify(key);
      delete this.timer[cacheKey];
      return this.cache.delete(cacheKey);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.timer = {};
      return this.cache.clear();
    }
  }]);

  return MapCache;
}();
/**
 * 请求异常
 */

var RequestError =
/*#__PURE__*/
function (_Error) {
  inherits(RequestError, _Error);

  function RequestError(text) {
    var _this2;

    classCallCheck(this, RequestError);

    _this2 = possibleConstructorReturn(this, getPrototypeOf(RequestError).call(this, text));
    _this2.name = "RequestError";
    return _this2;
  }

  return RequestError;
}(wrapNativeSuper(Error));
/**
 * 响应异常
 */

var ResponseError =
/*#__PURE__*/
function (_Error2) {
  inherits(ResponseError, _Error2);

  function ResponseError(response, text, data) {
    var _this3;

    classCallCheck(this, ResponseError);

    _this3 = possibleConstructorReturn(this, getPrototypeOf(ResponseError).call(this, text || response.statusText));
    _this3.name = "ResponseError";
    _this3.data = data;
    _this3.response = response;
    return _this3;
  }

  return ResponseError;
}(wrapNativeSuper(Error));
/**
 * http://gitlab.alipay-inc.com/KBSJ/gxt/blob/release_gxt_S8928905_20180531/src/util/request.js#L63
 * 支持gbk
 */

function readerGBK(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsText(file, "GBK"); // setup GBK decoding
  });
}
/**
 * 安全的JSON.parse
 */

function safeJsonParse(data) {
  try {
    return JSON.parse(data);
  } catch (e) {} // eslint-disable-line


  return data;
}

var WrappedFetch =
/*#__PURE__*/
function () {
  function WrappedFetch(url, options, cache) {
    classCallCheck(this, WrappedFetch);

    this.cache = cache;
    this.url = url;
    this.options = options;

    this._addfix();

    return this._doFetch();
  }

  createClass(WrappedFetch, [{
    key: "_addfix",
    value: function _addfix() {
      var _this$options = this.options,
          prefix = _this$options.prefix,
          suffix = _this$options.suffix; // 前缀

      if (prefix) {
        this.url = "".concat(prefix).concat(this.url);
      } // 后缀


      if (suffix) {
        this.url = "".concat(this.url).concat(suffix);
      }
    }
  }, {
    key: "_doFetch",
    value: function _doFetch() {
      var _this = this;

      var useCache = this.options.method === "get" && this.options.useCache;

      if (useCache) {
        var response = this.cache.get({
          url: this.url,
          params: this.options.params
        });

        if (response) {
          response = response.clone();

          var _instance = Promise.resolve(response); // cache也应用response拦截器, 感觉可以不要, 因为只缓存状态200状态的数据?


          responseInterceptors.forEach(function (handler) {
            _instance = _instance.then(function (res) {
              return handler(res, _this.options);
            });
          });
          return this._parseResponse(_instance, true);
        }
      }

      var instance = fetch(this.url, this.options); // 处理超时

      instance = this._wrappedTimeout(instance); // 处理缓存 1.只有get 2.同时参数cache为true 才缓存

      instance = this._wrappedCache(instance, useCache); // 返回解析好的数据

      return this._parseResponse(instance);
    }
    /**
     * 处理超时参数 #TODO 超时后连接还在继续
     * Promise.race方式ref: @期贤 http://gitlab.alipay-inc.com/bigfish/bigfish/raw/a2595e1bc52ba624fefe2c98ac54500b8b735835/packages/umi-plugin-bigfish/src/plugins/bigfishSdk/request.js
     * @param {*} instance fetch实例
     */

  }, {
    key: "_wrappedTimeout",
    value: function _wrappedTimeout(instance) {
      var timeout = this.options.timeout;

      if (timeout > 0) {
        return Promise.race([new Promise(function (_, reject) {
          return setTimeout(function () {
            return reject(new RequestError("timeout of ".concat(timeout, "ms exceeded")));
          }, timeout);
        }), instance]);
      } else {
        return instance;
      }
    }
    /**
     * 处理缓存
     * @param {*} instance fetch实例
     * @param {boolean} useCache 是否缓存
     */

  }, {
    key: "_wrappedCache",
    value: function _wrappedCache(instance, useCache) {
      var _this2 = this;

      if (useCache) {
        var _this$options2 = this.options,
            params = _this$options2.params,
            ttl = _this$options2.ttl;
        return instance.then(function (response) {
          // 只缓存状态码为 200
          if (response.status === 200) {
            var copy = response.clone();
            copy.useCache = true;

            _this2.cache.set({
              url: _this2.url,
              params: params
            }, copy, ttl);
          }

          return response;
        });
      } else {
        return instance;
      }
    }
    /**
     * 处理返回类型, 并解析数据
     * @param {*} instance fetch实例
     * @param {boolean} useCache 返回类型, 默认json
     */

  }, {
    key: "_parseResponse",
    value: function _parseResponse(instance) {
      var _this3 = this;

      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$options3 = this.options,
          _this$options3$respon = _this$options3.responseType,
          responseType = _this$options3$respon === void 0 ? "json" : _this$options3$respon,
          _this$options3$charse = _this$options3.charset,
          charset = _this$options3$charse === void 0 ? "utf8" : _this$options3$charse,
          _this$options3$getRes = _this$options3.getResponse,
          getResponse = _this$options3$getRes === void 0 ? false : _this$options3$getRes;
      return new Promise(function (resolve, reject) {
        var copy;
        instance.then(function (response) {
          copy = response.clone();
          copy.useCache = useCache;

          if (charset === "gbk") {
            try {
              return response.blob().then(function (blob) {
                return readerGBK(blob);
              }).then(safeJsonParse);
            } catch (e) {
              throw new ResponseError(copy, e.message);
            }
          } else if (responseType === "json" || responseType === "text") {
            return response.text().then(safeJsonParse);
          } else {
            try {
              // 其他如blob, arrayBuffer, formData
              return response[responseType]();
            } catch (e) {
              throw new ResponseError(copy, "responseType not support");
            }
          }
        }).then(function (data) {
          if (copy.status >= 200 && copy.status < 300) {
            // 提供源response, 以便自定义处理
            if (getResponse) {
              resolve({
                data: data,
                response: copy
              });
            } else {
              resolve(data);
            }
          } else {
            throw new ResponseError(copy, "http error", data);
          }
        }).catch(_this3._handleError.bind(_this3, {
          reject: reject,
          resolve: resolve
        }));
      });
    }
    /**
     * 处理错误
     * @param {*} param0
     * @param {*} error
     */

  }, {
    key: "_handleError",
    value: function _handleError(_ref, error) {
      var reject = _ref.reject,
          resolve = _ref.resolve;
      var errorHandler = this.options.errorHandler;

      if (errorHandler) {
        try {
          var data = errorHandler(error);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(error);
      }
    }
  }]);

  return WrappedFetch;
}();

/**
 * rpc 相关, 待实现
 */
var WrappedRpc = function WrappedRpc(input) {
  classCallCheck(this, WrappedRpc);

  return {
    hello: input
  };
};

/**
 * 获取request实例 调用参数可以覆盖初始化的参数. 用于一些情况的特殊处理.
 * @param {*} initOptions 初始化参数
 */

var request = function request() {
  var initOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mapCache = new MapCache(initOptions);

  var instance = function instance(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options.headers = objectSpread({}, initOptions.headers, options.headers);
    options.params = objectSpread({}, initOptions.params, options.params);
    options = objectSpread({}, initOptions, options);
    var method = options.method || "get";
    options.method = method.toLowerCase();

    if (method === "rpc") {
      // call rpc
      return new WrappedRpc(input, options, mapCache);
    } else {
      return new WrappedFetch(input, options, mapCache);
    }
  }; // 增加语法糖如: request.get request.post


  var methods = ["get", "post", "delete", "put", "rpc", "patch"];
  methods.forEach(function (method) {
    instance[method] = function (input, options) {
      return instance(input, objectSpread({}, options, {
        method: method
      }));
    };
  }); // 给request 也增加一个interceptors引用;

  instance.interceptors = fetch.interceptors;
  return instance;
};
/**
 * extend 方法参考了ky, 让用户可以定制配置.
 * initOpions 初始化参数
 * @param {number} maxCache 最大缓存数
 * @param {string} prefix url前缀
 * @param {function} errorHandler 统一错误处理方法
 * @param {object} headers 统一的headers
 */


var extend = function extend(initOptions) {
  return request(initOptions);
};
var request$1 = request();

export default request$1;
export { fetch, extend, RequestError, ResponseError };
