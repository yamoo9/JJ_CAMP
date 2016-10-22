/*! dom-create-manipulation.js © yamoo9.net, 2016 */
(function(global){
  'use strict';

  var body = query('body');

  var container = createEl({
    'element': 'article',
    'attr': { 'id': 'lecture' },
    'text': 'indipendency article',
    'finish': function() {
      this.onmouseover = function() {
        this.style.background = '#fb4848';
      };
      appendTo(this, body);
    }
  });

}(this));

