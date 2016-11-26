/*! jquery.ui.carousel.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';

  // 플러그인: 인스턴스 메소드
  var carousel = function() {
    // this === jQuery {}
    console.log('this:', this);
  };

  if (!$.fn.carousel) {
    $.fn.carousel = carousel;
  }

})(this, this.jQuery);
