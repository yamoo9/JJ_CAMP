/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*! app.js © yamoo9.net, 2016 */
	'use strict';

	// var temp = 'app.js';
	// debugger;

	// 의존 모듈(square, factorial) 로드
	// server side javascript env. module load
	// CommonJS 방법 모듈 로드 require() 함수 사용
	var square    = __webpack_require__(1);
	var factorial = __webpack_require__(2);

	var s_result = square(3);
	var result   = factorial(s_result);

	console.log(s_result, result);
	// console.log(s_result, result, temp);

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*! square.js © yamoo9.net, 2016 */
	// debugger;
	var temp = 'square.js';
	// debugger;

	function square(n) {
	  return n * n;
	}

	// CommonJS 방법 모듈 출력 module.exports
	module.exports = square;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*! factorial.js © yamoo9.net, 2016 */

	var temp = 'factorial.js';
	// debugger;

	function factorial(n) {
	  return n < 2 ? 1 : n * factorial(n - 1);
	}

	module.exports = factorial;

/***/ }
/******/ ]);