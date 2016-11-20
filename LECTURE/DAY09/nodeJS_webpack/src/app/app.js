/*! app.js © yamoo9.net, 2016 */
'use strict';

// [CSS] --------------------------------------------------------------------------
// require('./css/app.css');

// [Sass] --------------------------------------------------------------------------
require('./sass/app.sass');


// [JS] ---------------------------------------------------------------------------
// var temp = 'app.js';
// debugger;

// 의존 모듈(square, factorial) 로드
// server side javascript env. module load
// CommonJS 방법 모듈 로드 require() 함수 사용
let square     = require('./modules/square');
let factorial  = require('./modules/factorial');
let capitalize = require('./modules/capitalize');
let camelCase  = require('./modules/camelCase');

let s_result = square(3);
let f_result = factorial(s_result);
let message  = 'capitalize is awesome function!';

console.log( 'square:', s_result );
console.log( 'factorial:', f_result );
console.log( 'capitalize:', capitalize(message) );
console.log( 'camelCase:', camelCase(message) );

// --------------------------------------------------------------------------------

// ECMAScript 2015: ES 6th Edition 모듈 로드 방법
import './es6-jQuery';