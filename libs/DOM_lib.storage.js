(function(global, $){
  'use strict';

  // 사용자의 웹 브라우저가 새로운 스토리지 기술인
  // localStorage를 지원하는가? 확인...
  var storage = global.localStorage;
  // JSON 객체를 웹 브라우저가 지원하는가?
  var json = global.JSON;

  var support_need_features = storage && json;

  // 정적 메소드 확장
  $.include({
    'storage': support_need_features ? {
      // localStorage.getItem()
      'get': function(key) {
        if (!key || $.type(key) !== 'string') {}
        key = storage.getItem(key);
        var is_object = /({|:|})+/g.test(key);
        return is_object ? json.parse( key ) : key;
      },
      // localStorage.setItem()
      'set': function(key, value) {
        if (
          !key ||
          !value ||
          $.type(key) !== 'string'
        ) {}
        // JSON 객체를 거쳐서 문자화(Stringify);
        value = json.stringify(value);
        storage.setItem(key, value);
      },
      // localStorage.removeItem()
      'remove': function(key) {
        storage.removeItem(key);
      },
      // localStorage.clear()
      'clear': function() {
        storage.clear();
      }
    } : null
    // 'storage': (function(){
    //   // 클로저 영역
    //   // 외부에 공개되지 않는 별도의 지역 공간
    //   // Singleton 객체 반환
    //   // JSON 데이터 관리 역할
    //   return {

    //   };
    // })()
  });

})(this, this.y9);