/*! 02-traversal-DOM.js © yamoo9.net, 2016 */

var toggle_btn = $q('.button-toggle');
var container = $q('.toggled-container');

toggle_btn.addEventListener('click', function() {
  container.classList.toggle('screen-off');
});