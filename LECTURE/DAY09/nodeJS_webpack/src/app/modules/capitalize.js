/*! capitalize.js © yamoo9.net, 2016 */
function capitalize(s) {
  return s.split(' ')
    .map(function(k){
      return k.replace(/^./, function($1){
          return $1.toUpperCase();
      });
    }).join(' ');
}

module.exports = capitalize;