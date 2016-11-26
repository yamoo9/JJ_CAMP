/*! jquery.string.includes.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';

  // 비공개
  var includes = function(str, compare) {
    if ( $.type(str) !== 'string' || $.type(compare) !== 'string' ) {
      throw new Error('인자는 문자 유형이어야 한다.');
    }
    return str.indexOf(compare) > -1;
  };

  // ES6에 추가된 String.prototype.includes 메소드
  // 'hey you!'.includes('yo'); // true
  // 'hey you!'.includes('Yo'); // false

  // [존재 유무 검증] 이미 해당 유틸리티 메소드가 존재하는가?
  if ( !$.includes ) {
    // 유틸리티 메소드 정의
    $.includes = includes;
  }

})(this, this.jQuery);
