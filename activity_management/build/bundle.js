/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./http/config.js":
/*!************************!*\
  !*** ./http/config.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ \"qs\");\n/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);\n\n // 对axios的封装\n\nvar fetch = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n  baseURL: 'http://127.0.0.1:8090/activity_management',\n  // 这里是后端服务器地址\n  credentials: 'include',\n  // 即便是跨域，也携带cookie\n  timeout: 5000 // request timeout\n\n}); // 添加请求拦截器\n\nfetch.interceptors.request.use(function (config) {\n  // console.log(config.data)\n  // 在发送请求之前做些什么\n  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {\n    if (typeof config.data !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {\n      config.data = qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(config.data);\n    }\n  }\n\n  return config;\n}, function (error) {\n  // 对请求错误做些什么\n  return Promise.reject(error);\n}); // 添加响应拦截器\n\nfetch.interceptors.response.use(function (response) {\n  // 对响应数据做点什么\n  // 把响应字符串转换成JSON数据格式（后端数据请求造的孽）\n  if (response.data) {\n    var reg = /([^\\s^{^}^,^=^\\[^\\]]+)/g;\n    var temp = response.data.replace(reg, '\"$1\"');\n    var result = temp.replace(/=/g, \":\");\n    response.data = JSON.parse(result);\n  }\n\n  return response;\n}, function (error) {\n  // 错误响应应该\n  if (error.response) {\n    if (error.response.status === 500) {\n      console.log('服务器错误，请联系管理员处理');\n    }\n\n    return Promise.reject(error.response.data);\n  } else {\n    return Promise.reject(error);\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (fetch);\n\n//# sourceURL=webpack:///./http/config.js?");

/***/ }),

/***/ "./http/index.js":
/*!***********************!*\
  !*** ./http/index.js ***!
  \***********************/
/*! exports provided: getActivity, loginVerify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getActivity\", function() { return getActivity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loginVerify\", function() { return loginVerify; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./http/config.js\");\n/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ \"qs\");\n/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);\n\n // 获取活动列表\n\nfunction getActivity(params) {\n  return Object(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    url: '/getActivityList',\n    method: 'get',\n    params: params\n  });\n} // login\n\nfunction loginVerify(params) {\n  console.log('我是登录验证的方法！');\n  return Object(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    url: '/login',\n    method: 'get',\n    params: params\n  });\n} // export function apiGetData() {\n//     return fetch({\n//         url: '/api/data/menu-list',\n//         method: 'get'\n//     })\n// }\n// // 登录校验\n// export function apiLogin(params) {\n//     return fetch({\n//         url: '/api/login/validate',\n//         method: 'get',\n//         params\n//     })\n// }\n\n//# sourceURL=webpack:///./http/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/pages/Login/Login.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/pages/Login/Login.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"._36TdG7iAWf3usn6-t4rQoe{\\r\\n  width: 100vw;\\r\\n  height: 100vh;\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  background-color: #2b3b4a;\\r\\n}\\r\\n._17UWCGEQFAT34XLoLDqgpz{\\r\\n  width: 100vw;\\r\\n  height: 40vh;\\r\\n  margin-top: 10vh;\\r\\n}\\r\\n._2MHYIjond_8k_ZlB_UH6I5{\\r\\n  width: 82vw;\\r\\n  position: absolute;\\r\\n  top: 50vh;\\r\\n}\\r\\n._5o36lPeFi2BoEgHI9Xq-d{\\r\\n  width: 70vw;\\r\\n  position: absolute;\\r\\n  top: 92vh;\\r\\n  left: 50%;\\r\\n  transform: translateX(-50%);\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  justify-content: space-around;\\r\\n}\\r\\n._3YhxO5ITIhjR5FNq1Nq1LM{\\r\\n  /* transform: scale(2); */\\r\\n  width: 4.5vh;\\r\\n  height: 4.5vh;\\r\\n}\\r\\n.u8_Mtv8QFUfHE7LCujQ49{\\r\\n  color: #2b3b4a;\\r\\n}\\r\\n\", \"\"]);\n// Exports\nexports.locals = {\n\t\"contain\": \"_36TdG7iAWf3usn6-t4rQoe\",\n\t\"logo\": \"_17UWCGEQFAT34XLoLDqgpz\",\n\t\"InputBox\": \"_2MHYIjond_8k_ZlB_UH6I5\",\n\t\"quickLogin\": \"_5o36lPeFi2BoEgHI9Xq-d\",\n\t\"icon\": \"_3YhxO5ITIhjR5FNq1Nq1LM\",\n\t\"btn\": \"u8_Mtv8QFUfHE7LCujQ49\"\n};\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/pages/Login/Login.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/pages/activititySquare/activitySquare.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/pages/activititySquare/activitySquare.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"._13kZyFUBojXfOv29vaQQj-{\\r\\n  width: 100vw;\\r\\n  padding: 4vw;\\r\\n  height: 87vh;\\r\\n  overflow: scroll;\\r\\n}\\r\\n.ejFaq7OkhadFb7kGOaHQq{\\r\\n  width: 100%;\\r\\n  box-sizing: border-box;\\r\\n  border-radius: 2.5vw;\\r\\n  margin-bottom: 1vh;\\r\\n}\\r\\n._3wjdKtkHtCwVV94zBx6PJO{\\r\\n  color: #3d3d3a;\\r\\n  font-size: 14px;\\r\\n  font-weight: 600;\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\\r\\n._2OCXzA3ngHCUdzkcmn49OL{\\r\\n  margin-top: 1vh;\\r\\n  padding: 0 3vw;\\r\\n  border-left: 2px solid #fdfcf9;\\r\\n  border-right: 2px solid #fdfcf9;\\r\\n}\\r\\n._1EKZrliZuPlgq9OlrYr303{\\r\\n  /* height: 200vh; */\\r\\n}\\r\\n._1mpFwo-ho55wkqtiT-MyvW{\\r\\n  width: 100%;\\r\\n  display: flex;\\r\\n  justify-content: space-around;\\r\\n  align-items: flex-start;\\r\\n  padding: 1vh 0;\\r\\n  border-bottom: 1px solid #eeede9;\\r\\n}\\r\\na {\\r\\n  color: #000;\\r\\n}\\r\\n._3-7Eg6r1k5Ur8pJE40kQ3m{\\r\\n  width: 12vh;\\r\\n  height: 12vh;\\r\\n}\\r\\n\\r\\n/* menu的样式 */\\r\\n._3MOhDxyXzEr-NnCvpDgAnM{\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  align-items: center;\\r\\n}\", \"\"]);\n// Exports\nexports.locals = {\n\t\"contain\": \"_13kZyFUBojXfOv29vaQQj-\",\n\t\"poster\": \"ejFaq7OkhadFb7kGOaHQq\",\n\t\"text\": \"_3wjdKtkHtCwVV94zBx6PJO\",\n\t\"acitivityContain\": \"_2OCXzA3ngHCUdzkcmn49OL\",\n\t\"activityList\": \"_1EKZrliZuPlgq9OlrYr303\",\n\t\"activtyItem\": \"_1mpFwo-ho55wkqtiT-MyvW\",\n\t\"img\": \"_3-7Eg6r1k5Ur8pJE40kQ3m\",\n\t\"menuContain\": \"_3MOhDxyXzEr-NnCvpDgAnM\"\n};\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/pages/activititySquare/activitySquare.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/pages/home/Home.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/pages/home/Home.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"._2RMxk4bTW35_OYPALSCyz6{\\r\\n  /* transform: scale(2); */\\r\\n  width: 3vh;\\r\\n  height:3vh;\\r\\n}\\r\\n._1Ic1-ImerJTVjeAw1uRj_J{\\r\\n  margin-left: 2.5vw;\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n  flex-flow: column;\\r\\n}\", \"\"]);\n// Exports\nexports.locals = {\n\t\"icon\": \"_2RMxk4bTW35_OYPALSCyz6\",\n\t\"iconContain\": \"_1Ic1-ImerJTVjeAw1uRj_J\"\n};\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/pages/home/Home.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/pages/homePage/HomePage.css":
/*!*****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/pages/homePage/HomePage.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"._9t4QyWZjncf6xK4DlCXGn{\\r\\n  width: 100vw;\\r\\n  padding: 4vw;\\r\\n  height: 87vh;\\r\\n  overflow: scroll;\\r\\n}\\r\\n._2DACUvLfG9qI-0vD6HJIHP{\\r\\n  width: 100%;\\r\\n  box-sizing: border-box;\\r\\n  border-radius: 2.5vw;\\r\\n  margin-bottom: 1vh;\\r\\n}\\r\\n._1vRMOABb5SrAhiy-i8_5gh{\\r\\n  margin-top: 1vh;\\r\\n  padding-left: 4vw;\\r\\n}\\r\\n.uxD6MFlcfQVWujSlmOJKr{\\r\\n  background-color: azure;\\r\\n  height: 200vh;\\r\\n}\\r\\n._3fuGUlKjPcSHD73lacbCvV{\\r\\n  color: #3d3d3a;\\r\\n  font-size: 14px;\\r\\n  font-weight: 600;\\r\\n}\\r\\n\\r\\n\", \"\"]);\n// Exports\nexports.locals = {\n\t\"contain\": \"_9t4QyWZjncf6xK4DlCXGn\",\n\t\"poster\": \"_2DACUvLfG9qI-0vD6HJIHP\",\n\t\"acitivityContain\": \"_1vRMOABb5SrAhiy-i8_5gh\",\n\t\"activityList\": \"uxD6MFlcfQVWujSlmOJKr\",\n\t\"text\": \"_3fuGUlKjPcSHD73lacbCvV\"\n};\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/pages/homePage/HomePage.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/insertCss.js":
/*!***********************************************************!*\
  !*** ./node_modules/isomorphic-style-loader/insertCss.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */\n\n\n\nvar inserted = {};\n\nfunction b64EncodeUnicode(str) {\n  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {\n    return String.fromCharCode(\"0x\" + p1);\n  }));\n}\n\nfunction removeCss(ids) {\n  ids.forEach(function (id) {\n    if (--inserted[id] <= 0) {\n      var elem = document.getElementById(id);\n\n      if (elem) {\n        elem.parentNode.removeChild(elem);\n      }\n    }\n  });\n}\n\nfunction insertCss(styles, _temp) {\n  var _ref = _temp === void 0 ? {} : _temp,\n      _ref$replace = _ref.replace,\n      replace = _ref$replace === void 0 ? false : _ref$replace,\n      _ref$prepend = _ref.prepend,\n      prepend = _ref$prepend === void 0 ? false : _ref$prepend,\n      _ref$prefix = _ref.prefix,\n      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;\n\n  var ids = [];\n\n  for (var i = 0; i < styles.length; i++) {\n    var _styles$i = styles[i],\n        moduleId = _styles$i[0],\n        css = _styles$i[1],\n        media = _styles$i[2],\n        sourceMap = _styles$i[3];\n    var id = \"\" + prefix + moduleId + \"-\" + i;\n    ids.push(id);\n\n    if (inserted[id]) {\n      if (!replace) {\n        inserted[id]++;\n        continue;\n      }\n    }\n\n    inserted[id] = 1;\n    var elem = document.getElementById(id);\n    var create = false;\n\n    if (!elem) {\n      create = true;\n      elem = document.createElement('style');\n      elem.setAttribute('type', 'text/css');\n      elem.id = id;\n\n      if (media) {\n        elem.setAttribute('media', media);\n      }\n    }\n\n    var cssText = css;\n\n    if (sourceMap && typeof btoa === 'function') {\n      cssText += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + b64EncodeUnicode(JSON.stringify(sourceMap)) + \"*/\";\n      cssText += \"\\n/*# sourceURL=\" + sourceMap.file + \"?\" + id + \"*/\";\n    }\n\n    if ('textContent' in elem) {\n      elem.textContent = cssText;\n    } else {\n      elem.styleSheet.cssText = cssText;\n    }\n\n    if (create) {\n      if (prepend) {\n        document.head.insertBefore(elem, document.head.childNodes[0]);\n      } else {\n        document.head.appendChild(elem);\n      }\n    }\n  }\n\n  return removeCss.bind(null, ids);\n}\n\nmodule.exports = insertCss;\n//# sourceMappingURL=insertCss.js.map\n\n\n//# sourceURL=webpack:///./node_modules/isomorphic-style-loader/insertCss.js?");

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Header */ \"./src/components/Header.jsx\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      var props = this.props;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, Object(react_router_config__WEBPACK_IMPORTED_MODULE_1__[\"renderRoutes\"])(props.route.routes));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.userReducer.user\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"connect\"])(mapStateToProps, null)(App));\n\n//# sourceURL=webpack:///./src/App.jsx?");

/***/ }),

/***/ "./src/components/Header.jsx":
/*!***********************************!*\
  !*** ./src/components/Header.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar Header =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Header, _React$Component);\n\n  function Header() {\n    _classCallCheck(this, Header);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));\n  }\n\n  _createClass(Header, [{\n    key: \"click\",\n    value: function click() {\n      console.log('点击事件绑定成功！');\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/\"\n      }, \"home\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/login\"\n      }, \"login\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"\\u6211\\u662F\\u7EC4\\u4EF6Header !\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        onClick: this.click\n      }, \" Click me !\"));\n    }\n  }]);\n\n  return Header;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/components/Header.jsx?");

/***/ }),

/***/ "./src/pages/Login/InputBox.jsx":
/*!**************************************!*\
  !*** ./src/pages/Login/InputBox.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Login_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.css */ \"./src/pages/Login/Login.css\");\n/* harmony import */ var _Login_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Login_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\nvar NormalLoginForm =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(NormalLoginForm, _React$Component);\n\n  function NormalLoginForm(props) {\n    var _this;\n\n    _classCallCheck(this, NormalLoginForm);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(NormalLoginForm).call(this, props));\n    console.log(_this.props.user);\n    return _this;\n  }\n\n  _createClass(NormalLoginForm, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      if (this.props.staticContext) {\n        this.props.staticContext.css.push(_Login_css__WEBPACK_IMPORTED_MODULE_2___default.a._getCss());\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var userName = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();\n      var passWord = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();\n      var verify = this.props.verify;\n\n      if (this.props.user) {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__[\"Redirect\"], {\n          to: \"/activitySquare\"\n        });\n      }\n\n      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Input\"], {\n        prefix: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Icon\"], {\n          type: \"user\",\n          style: {\n            color: 'rgba(0,0,0,.25)'\n          }\n        }),\n        placeholder: \"Username\",\n        size: \"large\",\n        ref: userName\n      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Input\"], {\n        prefix: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Icon\"], {\n          type: \"lock\",\n          style: {\n            color: 'rgba(0,0,0,.25)'\n          }\n        }),\n        type: \"password\",\n        placeholder: \"Password\",\n        size: \"large\",\n        ref: passWord\n      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Button\"], {\n        className: \"login-form-button\",\n        size: \"large\",\n        ghost: \"true\",\n        block: true,\n        onClick: function onClick() {\n          var account = {\n            userName: userName.current.state.value,\n            passWord: passWord.current.state.value\n          };\n          verify(account).then(function (res) {\n            if (res.data) {\n              // redux\n              _this2.props.loginSuccess(res);\n\n              console.log(_this2.props.user);\n            } else {\n              antd__WEBPACK_IMPORTED_MODULE_0__[\"message\"].info('账号或者密码出错！');\n            }\n          });\n        }\n      }, \"\\u767B\\u5F55\"));\n    }\n  }]);\n\n  return NormalLoginForm;\n}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    loginSuccess: function loginSuccess(res) {\n      dispatch({\n        type: 'LOGIN',\n        user: res\n      });\n    }\n  };\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.userReducer.user\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(mapStateToProps, mapDispatchToProps)(NormalLoginForm));\n\n//# sourceURL=webpack:///./src/pages/Login/InputBox.jsx?");

/***/ }),

/***/ "./src/pages/Login/Login.css":
/*!***********************************!*\
  !*** ./src/pages/Login/Login.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./Login.css */ \"./node_modules/css-loader/dist/cjs.js?!./src/pages/Login/Login.css\");\n    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.i, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack:///./src/pages/Login/Login.css?");

/***/ }),

/***/ "./src/pages/Login/Login.jsx":
/*!***********************************!*\
  !*** ./src/pages/Login/Login.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _InputBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputBox */ \"./src/pages/Login/InputBox.jsx\");\n/* harmony import */ var _Login_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.css */ \"./src/pages/Login/Login.css\");\n/* harmony import */ var _Login_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Login_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../withStyles */ \"./src/withStyles.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _http_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../http/index */ \"./http/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\nvar Login =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Login, _Component);\n\n  function Login() {\n    _classCallCheck(this, Login);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Login).apply(this, arguments));\n  }\n\n  _createClass(Login, [{\n    key: \"render\",\n    value: function render() {\n      var form = {};\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.contain\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"./image/school_bg.jpg\",\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.logo,\n        alt: \"\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.InputBox\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InputBox__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        form: form,\n        verify: _http_index__WEBPACK_IMPORTED_MODULE_5__[\"loginVerify\"]\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.quickLogin\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"], {\n        to: \"/activitySquare\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"./image/icon/qq.png\",\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n        alt: \"\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"], {\n        to: \"/activitySquare\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"./image/icon/weibo.png\",\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n        alt: \"\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"], {\n        to: \"/activitySquare\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"./image/icon/wechat.png\",\n        className: _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n        alt: \"\"\n      }))));\n    }\n  }]);\n\n  return Login;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_withStyles__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Login, _Login_css__WEBPACK_IMPORTED_MODULE_2___default.a));\n\n//# sourceURL=webpack:///./src/pages/Login/Login.jsx?");

/***/ }),

/***/ "./src/pages/Login/userReducer.js":
/*!****************************************!*\
  !*** ./src/pages/Login/userReducer.js ***!
  \****************************************/
/*! exports provided: userReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userReducer\", function() { return userReducer; });\n/* harmony import */ var _store_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/constant */ \"./src/store/constant.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar defaultState = {};\nvar userReducer = function userReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;\n  var actions = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (actions.type) {\n    case _store_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"].LOGIN:\n      return _objectSpread({}, state, {\n        user: actions.user\n      });\n\n    default:\n      return state;\n  }\n};\n\n//# sourceURL=webpack:///./src/pages/Login/userReducer.js?");

/***/ }),

/***/ "./src/pages/activititySquare/MenuContain.jsx":
/*!****************************************************!*\
  !*** ./src/pages/activititySquare/MenuContain.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _activitySquare_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activitySquare.css */ \"./src/pages/activititySquare/activitySquare.css\");\n/* harmony import */ var _activitySquare_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_activitySquare_css__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar MenuContain =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(MenuContain, _Component);\n\n  function MenuContain() {\n    _classCallCheck(this, MenuContain);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(MenuContain).apply(this, arguments));\n  }\n\n  _createClass(MenuContain, [{\n    key: \"handleClick\",\n    value: function handleClick(event) {\n      antd__WEBPACK_IMPORTED_MODULE_0__[\"message\"].info(event.key);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var menu = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"], {\n        onClick: this.handleClick\n      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].Item, {\n        key: \"1\"\n      }, \"1st menu item\"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].Item, {\n        key: \"2\"\n      }, \"2nd memu item\"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].Item, {\n        key: \"3\"\n      }, \"3rd menu item\"));\n      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n        className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_2___default.a.menuContain\n      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Dropdown\"], {\n        overlay: menu\n      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"a\", {\n        className: \"ant-dropdown-link\",\n        href: \"#\"\n      }, \"\\u5206\\u7C7B\", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Icon\"], {\n        type: \"caret-down\"\n      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Dropdown\"], {\n        overlay: menu\n      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"a\", {\n        className: \"ant-dropdown-link\",\n        href: \"#\"\n      }, \"\\u5F52\\u5C5E\\u7EC4\\u7EC7\", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Icon\"], {\n        type: \"caret-down\"\n      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Dropdown\"], {\n        overlay: menu\n      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"a\", {\n        className: \"ant-dropdown-link\",\n        href: \"#\"\n      }, \"\\u72B6\\u6001\", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Icon\"], {\n        type: \"caret-down\"\n      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Dropdown\"], {\n        overlay: menu\n      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"a\", {\n        className: \"ant-dropdown-link\",\n        href: \"#\"\n      }, \"\\u6392\\u5E8F\", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__[\"Icon\"], {\n        type: \"caret-down\"\n      }))));\n    }\n  }]);\n\n  return MenuContain;\n}(react__WEBPACK_IMPORTED_MODULE_1__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MenuContain);\n\n//# sourceURL=webpack:///./src/pages/activititySquare/MenuContain.jsx?");

/***/ }),

/***/ "./src/pages/activititySquare/action.js":
/*!**********************************************!*\
  !*** ./src/pages/activititySquare/action.js ***!
  \**********************************************/
/*! exports provided: getActivityList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getActivityList\", function() { return getActivityList; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _http_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../http/index */ \"./http/index.js\");\n\n\nvar getActivityList = function getActivityList() {\n  return function (dispatch) {\n    return Object(_http_index__WEBPACK_IMPORTED_MODULE_1__[\"getActivity\"])({\n      page: 0\n    }).then(function (res) {\n      dispatch({\n        type: 'ACtIVITY_LIST',\n        activity: res.data\n      });\n    });\n  };\n};\n\n//# sourceURL=webpack:///./src/pages/activititySquare/action.js?");

/***/ }),

/***/ "./src/pages/activititySquare/activityListReducer.js":
/*!***********************************************************!*\
  !*** ./src/pages/activititySquare/activityListReducer.js ***!
  \***********************************************************/
/*! exports provided: activityReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"activityReducer\", function() { return activityReducer; });\n/* harmony import */ var _store_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/constant */ \"./src/store/constant.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar defaultState = {};\nvar activityReducer = function activityReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;\n  var actions = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (actions.type) {\n    case _store_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ACtIVITY_LIST:\n      return _objectSpread({}, state, {\n        activity: actions.activity\n      });\n\n    case _store_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"].REMOVE_ACTIVITY:\n      return _objectSpread({}, state, {\n        activity: actions.activity\n      });\n\n    default:\n      return state;\n  }\n};\n\n//# sourceURL=webpack:///./src/pages/activititySquare/activityListReducer.js?");

/***/ }),

/***/ "./src/pages/activititySquare/activitySquare.css":
/*!*******************************************************!*\
  !*** ./src/pages/activititySquare/activitySquare.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./activitySquare.css */ \"./node_modules/css-loader/dist/cjs.js?!./src/pages/activititySquare/activitySquare.css\");\n    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.i, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack:///./src/pages/activititySquare/activitySquare.css?");

/***/ }),

/***/ "./src/pages/activititySquare/activitySquare.jsx":
/*!*******************************************************!*\
  !*** ./src/pages/activititySquare/activitySquare.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action */ \"./src/pages/activititySquare/action.js\");\n/* harmony import */ var _activitySquare_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activitySquare.css */ \"./src/pages/activititySquare/activitySquare.css\");\n/* harmony import */ var _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_activitySquare_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../withStyles */ \"./src/withStyles.js\");\n/* harmony import */ var _MenuContain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuContain */ \"./src/pages/activititySquare/MenuContain.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\n\nvar activitySquare =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(activitySquare, _Component);\n\n  function activitySquare() {\n    _classCallCheck(this, activitySquare);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(activitySquare).apply(this, arguments));\n  }\n\n  _createClass(activitySquare, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      this.props.getActivityList();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var activityList = this.props.activityList;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.contain\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"./image/posters.jpg\",\n        className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.poster,\n        alt: \"\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.text\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"text\", null, \"\\u672C\\u6821\\u6D3B\\u52A8\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.acitivityContain\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MenuContain__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.activityList\n      }, activityList && activityList.map(function (item, index) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.activtyItem,\n          key: index\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"\\u3010\", item.community_name, \"\\u3011\"), item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, item.start_time), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, item.point)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          className: _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a.img,\n          src: \"./image/logo.jpg\",\n          alt: \"\"\n        }));\n      }))));\n    }\n  }]);\n\n  return activitySquare;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    getActivityList: function getActivityList() {\n      dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_2__[\"getActivityList\"])());\n    }\n  };\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    activityList: state.activityReducer.activity\n  };\n};\n\nvar activitysquare = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Object(_withStyles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(activitySquare, _activitySquare_css__WEBPACK_IMPORTED_MODULE_3___default.a));\n\nactivitysquare.loadData = function (store) {\n  return store.dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_2__[\"getActivityList\"])());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (activitysquare);\n\n//# sourceURL=webpack:///./src/pages/activititySquare/activitySquare.jsx?");

/***/ }),

/***/ "./src/pages/home/Home.css":
/*!*********************************!*\
  !*** ./src/pages/home/Home.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./Home.css */ \"./node_modules/css-loader/dist/cjs.js?!./src/pages/home/Home.css\");\n    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.i, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack:///./src/pages/home/Home.css?");

/***/ }),

/***/ "./src/pages/home/Home.jsx":
/*!*********************************!*\
  !*** ./src/pages/home/Home.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.css */ \"./src/pages/home/Home.css\");\n/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Home_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _homePage_HomePage_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../homePage/HomePage.jsx */ \"./src/pages/homePage/HomePage.jsx\");\n/* harmony import */ var _activititySquare_activitySquare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../activititySquare/activitySquare */ \"./src/pages/activititySquare/activitySquare.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\nvar Home =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Home, _Component);\n\n  function Home() {\n    _classCallCheck(this, Home);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));\n  }\n\n  _createClass(Home, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      if (this.props.staticContext) {\n        this.props.staticContext.css.push(_Home_css__WEBPACK_IMPORTED_MODULE_2___default.a._getCss());\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var TabPane = antd__WEBPACK_IMPORTED_MODULE_1__[\"Tabs\"].TabPane;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Tabs\"], {\n        defaultActiveKey: \"1\",\n        size: \"small  \",\n        tabPosition: \"bottom\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPane, {\n        tab: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.iconContain\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: \"./image/icon/shouye2.png\",\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n          alt: \"\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"\\u9996\\u9875\")),\n        key: \"1\",\n        forceRender: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_activititySquare_activitySquare__WEBPACK_IMPORTED_MODULE_4__[\"default\"], this.props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPane, {\n        tab: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.iconContain\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: \"./image/icon/huodong2.png\",\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n          alt: \"\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"\\u6D3B\\u52A8\")),\n        key: \"2\",\n        forceRender: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_activititySquare_activitySquare__WEBPACK_IMPORTED_MODULE_4__[\"default\"], this.props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPane, {\n        tab: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.iconContain\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: \"./image/icon/dongtai2.png\",\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n          alt: \"\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"\\u52A8\\u6001\")),\n        key: \"3\",\n        forceRender: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_homePage_HomePage_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], this.props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPane, {\n        tab: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.iconContain\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: \"./image/icon/wode2.png\",\n          className: _Home_css__WEBPACK_IMPORTED_MODULE_2___default.a.icon,\n          alt: \"\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"\\u6211\\u7684\")),\n        key: \"4\",\n        forceRender: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_homePage_HomePage_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], this.props))));\n    }\n  }]);\n\n  return Home;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./src/pages/home/Home.jsx?");

/***/ }),

/***/ "./src/pages/homePage/HomePage.css":
/*!*****************************************!*\
  !*** ./src/pages/homePage/HomePage.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./HomePage.css */ \"./node_modules/css-loader/dist/cjs.js?!./src/pages/homePage/HomePage.css\");\n    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.i, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack:///./src/pages/homePage/HomePage.css?");

/***/ }),

/***/ "./src/pages/homePage/HomePage.jsx":
/*!*****************************************!*\
  !*** ./src/pages/homePage/HomePage.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _HomePage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HomePage.css */ \"./src/pages/homePage/HomePage.css\");\n/* harmony import */ var _HomePage_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_HomePage_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _activititySquare_MenuContain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../activititySquare/MenuContain */ \"./src/pages/activititySquare/MenuContain.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar HomePage =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(HomePage, _Component);\n\n  function HomePage() {\n    _classCallCheck(this, HomePage);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(HomePage).apply(this, arguments));\n  }\n\n  _createClass(HomePage, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      if (this.props.staticContext) {\n        this.props.staticContext.css.push(_HomePage_css__WEBPACK_IMPORTED_MODULE_1___default.a._getCss());\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _HomePage_css__WEBPACK_IMPORTED_MODULE_1___default.a.contain\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"./image/posters.jpg\",\n        className: _HomePage_css__WEBPACK_IMPORTED_MODULE_1___default.a.poster,\n        alt: \"\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"text\", {\n        className: _HomePage_css__WEBPACK_IMPORTED_MODULE_1___default.a.text\n      }, \"\\u672C\\u6821\\u6D3B\\u52A8\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _HomePage_css__WEBPACK_IMPORTED_MODULE_1___default.a.acitivityContain\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_activititySquare_MenuContain__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _HomePage_css__WEBPACK_IMPORTED_MODULE_1___default.a.activityList\n      }, \"123\")));\n    }\n  }]);\n\n  return HomePage;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);\n\n//# sourceURL=webpack:///./src/pages/homePage/HomePage.jsx?");

/***/ }),

/***/ "./src/routers.js":
/*!************************!*\
  !*** ./src/routers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ \"./src/App.jsx\");\n/* harmony import */ var _pages_home_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/home/Home */ \"./src/pages/home/Home.jsx\");\n/* harmony import */ var _pages_Login_Login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/Login/Login */ \"./src/pages/Login/Login.jsx\");\n/* harmony import */ var _src_pages_activititySquare_activitySquare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/pages/activititySquare/activitySquare */ \"./src/pages/activititySquare/activitySquare.jsx\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  path: '/',\n  component: _App__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  routes: [{\n    path: '/home',\n    component: _pages_home_Home__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    exact: true\n  }, {\n    path: '/login',\n    component: _pages_Login_Login__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }, {\n    path: '/activitySquare',\n    component: _src_pages_activititySquare_activitySquare__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    loadData: _src_pages_activititySquare_activitySquare__WEBPACK_IMPORTED_MODULE_4__[\"default\"].loadData\n  }]\n}]);\n\n//# sourceURL=webpack:///./src/routers.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ \"./src/server/render.js\");\n/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/index */ \"./src/store/index.js\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../routers */ \"./src/routers.js\");\n// 模块引入方式问题，babel解决\n\n\n // const React = require('react');\n// const Express = require('express')\n// const render = require('./render')\n\n\n\n\nvar app = new express__WEBPACK_IMPORTED_MODULE_1___default.a(); // publi 前端打包后访问的静态资源\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static('public'));\napp.get('*', function (req, res) {\n  // render之前，保证redux中有数据，渲染出来的页面 就是带有数据的HTML\n  // 1. 访问当前url命中的所有组件\n  // 2. 拿到组件上面的loadData\n  // 3. dispatch\n  // 4. 渲染\n  var matchRouters = Object(react_router_config__WEBPACK_IMPORTED_MODULE_4__[\"matchRoutes\"])(_routers__WEBPACK_IMPORTED_MODULE_5__[\"default\"], req.path); // 创建一个store,然后往里面填充数据。这些数据就是被这个路由命中的所有组件的所有数据，包括dispatch之后的数据。所以，需要收集到所有的loadData,并等待它执行完成。\n\n  var store = Object(_store_index__WEBPACK_IMPORTED_MODULE_3__[\"Serverstore\"])(); // 收集所有的promise\n\n  var promises = [];\n  matchRouters.forEach(function (mRouter) {\n    if (mRouter.route.loadData) {\n      promises.push(mRouter.route.loadData(store));\n    }\n  }); // 等待执行完成后才render\n\n  Promise.all(promises).then(function (resArray) {\n    var context = {\n      css: []\n    };\n    var html = Object(_render__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(req, store, context);\n    res.send(html);\n  }).catch(function (err) {\n    console.log('服务端出错了', err);\n  });\n});\napp.listen(3000, function () {\n  console.log('server is runing http://localhost:3000');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/render.js":
/*!******************************!*\
  !*** ./src/server/render.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Header */ \"./src/components/Header.jsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _routers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../routers */ \"./src/routers.js\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../store/index */ \"./src/store/index.js\");\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (req, store, context) {\n  // jsx\n  var content = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_6__[\"Provider\"], {\n    store: store\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"StaticRouter\"], {\n    location: req.path,\n    context: context\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, Object(react_router_config__WEBPACK_IMPORTED_MODULE_5__[\"renderRoutes\"])(_routers__WEBPACK_IMPORTED_MODULE_4__[\"default\"]))))); // 渲染完成之后，再获取 css 样式\n\n  var cssStr = context.css.join('\\n');\n  return \"\\n<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n  <meta charset=\\\"UTF-8\\\">\\n  <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n  <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"ie=edge\\\">\\n  <link rel=\\\"stylesheet\\\" href=\\\"https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css\\\" />\\n  <style>\".concat(cssStr, \"</style>\\n  <title>activity_management</title>\\n</head>\\n<body>\\n  <div id=\\\"app\\\">\").concat(content, \"</div>\\n  <script>\\n    window.__context__  = {state: \").concat(JSON.stringify(store.getState()), \"}\\n  </script>\\n  <script src=\\\"/index.js\\\"></script>\\n</body>\\n</html>\\n  \");\n});\n\n//# sourceURL=webpack:///./src/server/render.js?");

/***/ }),

/***/ "./src/store/constant.js":
/*!*******************************!*\
  !*** ./src/store/constant.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar constant = {\n  ACtIVITY_LIST: 'ACtIVITY_LIST',\n  REMOVE_ACTIVITY: 'REMOVE_ACTIVITY',\n  UNCHECK_LIST: 'UNCHECK_LIST',\n  LOGIN: 'LOGIN'\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (constant);\n\n//# sourceURL=webpack:///./src/store/constant.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: Clientstore, Serverstore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Clientstore\", function() { return Clientstore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Serverstore\", function() { return Serverstore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ \"./src/store/reducer.js\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar Clientstore = function Clientstore() {\n  // store的默认值，把数据JSON.Stringfy放在了script中\n  var defaultStore = window.__context__ || {};\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducer__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"], defaultStore.state, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a));\n};\nvar Serverstore = function Serverstore() {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducer__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"], Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a));\n};\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/reducer.js":
/*!******************************!*\
  !*** ./src/store/reducer.js ***!
  \******************************/
/*! exports provided: reduce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reduce\", function() { return reduce; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_activititySquare_activityListReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/activititySquare/activityListReducer */ \"./src/pages/activititySquare/activityListReducer.js\");\n/* harmony import */ var _pages_Login_userReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/Login/userReducer */ \"./src/pages/Login/userReducer.js\");\n\n\n\nvar reduce = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  activityReducer: _pages_activititySquare_activityListReducer__WEBPACK_IMPORTED_MODULE_1__[\"activityReducer\"],\n  userReducer: _pages_Login_userReducer__WEBPACK_IMPORTED_MODULE_2__[\"userReducer\"]\n});\n\n//# sourceURL=webpack:///./src/store/reducer.js?");

/***/ }),

/***/ "./src/withStyles.js":
/*!***************************!*\
  !*** ./src/withStyles.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n //函数返回组件\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (DecoratedComponent, styles) {\n  return (\n    /*#__PURE__*/\n    function (_Component) {\n      _inherits(NewComponent, _Component);\n\n      function NewComponent() {\n        _classCallCheck(this, NewComponent);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(NewComponent).apply(this, arguments));\n      }\n\n      _createClass(NewComponent, [{\n        key: \"componentWillMount\",\n        value: function componentWillMount() {\n          if (this.props.staticContext) {\n            // styles._getCss来自isomorphic-style-loader\n            this.props.staticContext.css.push(styles._getCss());\n          }\n        }\n      }, {\n        key: \"render\",\n        value: function render() {\n          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DecoratedComponent, this.props);\n        }\n      }]);\n\n      return NewComponent;\n    }(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"])\n  );\n});\n\n//# sourceURL=webpack:///./src/withStyles.js?");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"antd\");\n\n//# sourceURL=webpack:///external_%22antd%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"qs\");\n\n//# sourceURL=webpack:///external_%22qs%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ })

/******/ });