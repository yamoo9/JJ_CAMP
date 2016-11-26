/*! jquery.string.repeat.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';

  // ES6 추가된 메소드 String.prototype.repeat
  // 'yamoo9 '.repeat(3); // 'yamoo9 yamoo9 yamoo9 '

  var repeat = function(str, repeat_count) {
    // 전달 받은 문자를 repeat_count 만큼 반복하여 생성한 문자를 반환
    // 초기 값 설정
    repeat_count = repeat_count || 1;
    // 검증
    if ( $.type(str) !== 'string' ) {
      throw new Error('첫번째 인자는 문자열로!');
    }
    if ( $.type(repeat_count) !== 'number' ) {
      throw new Error('첫번째 인자는 숫자로!');
    }
    var processing_str = '';
    // 반복 순환하여 문자열을 접합 로직
    while ( repeat_count-- ) {
      processing_str += str;
    }
    return processing_str;
  };

  if ( !$.repeat ) {
    $.repeat = repeat;
  }

})(this, this.jQuery);
