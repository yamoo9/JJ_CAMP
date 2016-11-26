/*! ui-carousel.js © yamoo9.net, 2016 */

(function(global, $){
  'use strict';

  $('#bs3-headphone').carousel();

})(this, this.jQuery);

(function(global){
  'use strict';

  // -------------------------------------------------------------------------
  // 문서 객체 참조

  var doc         = global.document;
  var carousel    = doc.querySelector('.ui-carousel');
  var tab_wrapper = carousel.querySelector('.ui-carousel-tabpanel-wrapper');

  // -------------------------------------------------------------------------
  // 이벤트 핸들러

  /** @function resizeCarouselHeight() 캐러셀 컴포넌트 높이를 변경하는 함수 */
  var resizeCarouselHeight = function() {
    var tab_panel = tab_wrapper.querySelector('.ui-carousel-tabpanel');
    carousel.style.height = tab_panel.clientHeight + 'px';
  };

  // -------------------------------------------------------------------------
  // 이벤트 핸들링

  global.addEventListener('DOMContentLoaded', resizeCarouselHeight);
  global.addEventListener('resize', resizeCarouselHeight);

}) // (this);
