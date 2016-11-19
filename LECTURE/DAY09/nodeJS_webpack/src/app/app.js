/*! app.js © yamoo9.net, 2016 */
'use strict';

// var temp = 'app.js';
// debugger;

// 의존 모듈(square, factorial) 로드
// server side javascript env. module load
// CommonJS 방법 모듈 로드 require() 함수 사용
var square     = require('./modules/square');
var factorial  = require('./modules/factorial');
var capitalize = require('./modules/capitalize');
var camelCase  = require('./modules/camelCase');

// --------------------------------------------------------------------------------

var s_result = square(3);
var f_result   = factorial(s_result);
var message  = 'capitalize is awesome function!';

console.log( 'square:', s_result );
console.log( 'factorial:', f_result );
console.log( 'capitalize:', capitalize(message) );
console.log( 'camelCase:', camelCase(message) );