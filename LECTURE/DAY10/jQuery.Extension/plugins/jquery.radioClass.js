/*! jquery.radioClass.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';

  var radioClass = function(class_name) {
    // this === jQuery {}
    // console.log('this:', this);
    // console.log('this.jquery:', this.jquery);

    // radioClass 가 적용된 자신(jQuery {})의 형제 중에
    // class_name 값을 가진 형제에게서 해당 class_name을 제거
    this.siblings('.'+class_name).removeClass(class_name);
    // radioClass 적용된 jQuery {} 객체는
    // class_name 이름의 class 속성이 추가
    this.addClass(class_name);
  };

  // $.fn === jQuery.prototype
  if ( !$.fn.radioClass ) {
    $.fn.radioClass = radioClass;
  }

})(this, this.jQuery);
