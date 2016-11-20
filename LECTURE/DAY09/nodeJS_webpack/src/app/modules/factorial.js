/*! factorial.js © yamoo9.net, 2016 */
// let temp = 'factorial.js';
// debugger;

// ES 3rd Edition
// function factorial(n) {
//   return n < 2 ? 1 : n * factorial(n - 1);
// }

// ECMAScript 2015: ES 6th Edition
let factorial = (n) => n < 2 ? 1 : n * factorial(n - 1);

module.exports = factorial;