(function(global, $){
  'use strict';

  // Ajax 라이브러리 사용할 초기 설정 값을 기억하는 객체
  var ajax_default_settings = {
    'method'  : 'GET',
    'type'    : 'json', // json, xml, html, text
    'url'     : null,
    'data'    : {},
    'success' : null,
    'error'   : null
  };

  // window.y9 생성자 함수 객체의 정적 메소드 추가
  $.include('ajax', function(obj, type, method, success, error){
    // Ajax 비동기 통신 Logic 코드 구현
    // 설계
    // 전달인자 [매개변수] 몇 개? 어떤 값? 값의 유형에 따라 어떻게 처리?
    // 오류 유무 판단
    if (!obj) { throw new Error('y9.ajax()의 첫번째 인자는 필수입니다.'); }
    var settings = {};
    // 전달인자의 유형
    switch ( $.type(obj) ) {
      // 1. 통신하고자 하는 데이터의 위치를 문자열로 전달
      case 'string':
        // console.log('전달된 인자 유형은 문자 데이터입니다.');
        settings = $.extend({}, {
          'url'    : obj,
          'type'   : type || ajax_default_settings.type,
          'method' : method || ajax_default_settings.type,
          success  : success || ajax_default_settings.success,
          error    : error || ajax_default_settings.error,
        });
      break;
      // 2. 상세하게 각각의 속성을 가진 객체 리터럴을 전달
      case 'object':
        // console.log('전달된 인자 유형은 객체 데이터입니다.');
        settings = $.extend(settings, ajax_default_settings, obj);
        // console.log('settings:', settings);
        // console.log('ajax_default_settings:', ajax_default_settings);
      break;
      default:
        console.error('문자 또는 객체 유형을 전달해야 합니다.');
    }

    // settings 란? 사용자가 설정한 값을 기본 값에 덮어 쓴 설정 객체
    // 설정 객체를 가지고 Ajax를 수행하는 코드를 완성
    // XMLHttpRequest 객체 생성
    var xhr = new global.XMLHttpRequest() || new global.ActiveXObject('Microsoft.XMLHTTP');
    // .open() 메소드를 사용해서 설정
    xhr.open( settings.method, settings.url );
    // .send() 사용
    xhr.send( settings.data );
    // onreadystatechange 이벤트 구문
    xhr.onreadystatechange = function() {
      if ( this.status === 200 && this.readyState === 4 ) {
        // 조건을 통해 통신이 성공했고, success가 존재한다면 success() 실행
        var response;
        switch(settings.type) {
          case 'text':
          case 'html':
            response = this.response;
          break;
          case 'xml':
            response = this.responseXML;
          break;
          case 'json':
            response = global.JSON.parse(this.response);
        }
        settings.success && settings.success.call(this, response, settings);
      } else {
        // 조건을 통해 통신이 실패했고, error가 존재한다면 error() 실행
        settings.error && settings.error.call(this, this.statusText, settings);
      }
    }
  });

  // $.ajax() 단축 메소드 추가
  $.include({
    'getXML': function(url, success) {
      $.ajax({
        'type': 'xml',
        'url': url,
        'success': success
      });
    },
    'getJSON': function(url, success, error) {
      $.ajax({
        'url': url,
        'success': success,
        'error': error
      });
    }
  });

})(this, this.y9);