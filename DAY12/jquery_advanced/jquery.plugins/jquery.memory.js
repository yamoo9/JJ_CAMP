(function(global, $){
  'use strict';

  // jQuery 플러그인
  // 타입 1. Static Method e.g) $.ajax(), $.type(), ...
  if ( $ && !$.memory ) {
    $.memory = function(dom_element, key, value) {
      // 기본 처리
      // $.data(dom_element, key, value) 사용
      if ( !$.data(dom_element, '$this') ) {
        $.data(dom_element, '$this', $(dom_element));
      }
      // key 값이 있을 경우, 처리
      if ( key ) {
        if ( !$.data(dom_element, key) ) {
          $.data(dom_element, key, value);
        }
        return $.data(dom_element, key);
      }
      // key 값이 없을 경우, 처리
      else {
        return $.data(dom_element, '$this');
      }
    };
    // 플러그인 별칭
    $.$ = $.memory;
  }

})(this, this.jQuery);