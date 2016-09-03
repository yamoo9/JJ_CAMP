(function(global, $){
  'use strict';

  // jQuery 플러그인
  // 타입 2. Instance Method e.g) $().css(), $().each(), ...
  // jQuery.fn === jQuery.prototype
  // console.log(jQuery.fn === jQuery.prototype);

  // jQuery.fn.temp = function() {
  //    // 플러그인 내부 함수에서 this는 플러그인이 연결된 jQuery 객체이다.
  //    console.log('플러그인 내부:', this.jquery);
  //    return this.each(function(){
  //         // return되는 함수 내부의 this는 DOM Element이다.
  //         console.log('return function 내부:', this);
  //    });
  // };

  if ( $ && !$.fn.radioClass ) {
    $.fn.radioClass = function(class_name) {
      if ( $.type(class_name) !== 'string' ) {}
      var $activated_sibling = this.siblings('.'+class_name);
      $activated_sibling.removeClass(class_name);
      this.addClass(class_name);
      return this;
    };
  }

})(this, this.jQuery);