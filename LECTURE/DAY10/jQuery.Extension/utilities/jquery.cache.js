/*! jquery.cache.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';

  var cache = function(dom_el) {
    // 검증
    // document.ELEMENT_NODE
    if ( dom_el.nodeType !== 1 ) { throw new Error('문서객체여야 합니다.') }
    // 메모리 대상
    // jQuery() 팩토리 함수를 사용(1회)한 결과를 저장
    // jQuery.data() 유틸리티 메소드 활용
    // <설정할 때> jQuery.data(dom_el, key, value)
    // <가져올 때> jQuery.data(dom_el, key)
    var $this = $.data(dom_el, '$this');
    // console.log('$this:', $this);
    return $this ? $this : $.data(dom_el, '$this', $(dom_el));
  };

  if ( !$.cache ) {
    $.cache = cache;
    $.$ = $.cache; // Alias
  }

})(this, this.jQuery);
