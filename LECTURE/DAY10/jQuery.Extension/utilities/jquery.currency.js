/*! jquery.currency.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';

  // $.currency(1289342) -> '1,289,342원'
  var addComma = function(n) {
    // 문자화 -> 배열화
    n = (n + '').split('');
    for ( var i = n.length - 3; i > 0; i=i-3 ) {
      n.splice(i, 0, ',');
    }
    return n.join('');
  };

  var currency = function(n, sign, sign_position) {
    sign_position = sign_position || 'after';
    sign = sign || '원';
    // 전달 받은 n 값의 끝에서 3번째 자리 수마다 콤마(,)를 추가
    // 통화 기호 `원`, `엔` 문자열 접합
    var change_currency = addComma(n);
    if ( sign_position !== 'after' ) {
      change_currency = sign + change_currency;
    } else {
      change_currency += sign;
    }
    return change_currency;
  };

  if ( !$.currency ) {
    $.currency = currency;
  }

})(this, this.jQuery);

