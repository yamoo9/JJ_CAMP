(function(global, $){
  'use strict';

  // jQuery 플러그인
  // 타입 1. Static Method e.g) $.ajax(), $.type(), ...
  if ( $ && !$.memory ) {
    $.memory = function(dom_element, key, value) {
      // $.data(dom_element, key, value) 사용
      if ( !$.data(dom_element, '$this') ) {
        $.data(dom_element, '$this', $(dom_element));
      }
      if ( key ) {
        if ( !$.data(dom_element, key) ) {
          $.data(dom_element, key, value);
        }
        return $.data(dom_element, key);
      } else {
        return $.data(dom_element, '$this');
      }
    };
    // 플러그인 별칭
    $.$ = $.memory;
  }
  // 타입 2. Instance Method e.g) $().css(), $().each(), ...
  // $().data() 사용

})(this, this.jQuery);