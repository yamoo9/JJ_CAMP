/*! factorial.js © yamoo9.net, 2016 */

var temp = 'factorial.js';
// debugger;

function factorial(n) {
  return n < 2 ? 1 : n * factorial(n - 1);
}

module.exports = factorial;