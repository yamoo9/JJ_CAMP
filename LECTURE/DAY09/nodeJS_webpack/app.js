/*! app.js © yamoo9.net, 2016 */
'use strict';

// factorial 함수 정의
function factorial(n) {
  // factorial 로직
  return n < 2 ? 1 : n * factorial(n - 1);
}

// square 함수 정의
function square(n) {
  return n * n;
}

var s_result = square(3);
var result = factorial(s_result);

console.log(s_result, result);