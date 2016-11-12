/*! ajax-study.js © yamoo9.net, 2016 */
(function(global, Ajax){
  'use strict';

  // 비동기 통신을 하기 위한 객체 생성
  // 생성자 함수 XMLHttpRequest 를 통해
  var xhr = new Ajax();
  // console.dir(xhr);

  // XMLHttpRequest.prototype
  // xhr.constructor.prototype
  // xhr.__proto__

  // false: 동기 방식의 통신
  // xhr.open('GET', './data/data.txt', false);

  // true:  비동기 방식의 통신
  // xhr.open('GET', './data/data.txt', true);
  // xhr.open('GET', './data/data.txt');
  // xhr.open('GET', './data/data.html');
  // xhr.open('GET', './data/data.xml');
  xhr.open('GET', './data/data.json');

  // xhr.send(); // 서버에 요청 응답을 받을 때 아무 것도 안함

  // 전송 상태 확인
  // if ( xhr.status === 200 ) {
  //   console.log('success');
  //   console.log(xhr.responseText); // 전송 성공 시, 응답 받은 데이터
  // } else {
  //   console.log(xhr.status);
  //   console.info('fail');
  // }

  // 비동기 통신 이벤트 감지 구문
  xhr.onreadystatechange = function() {
    if ( xhr.status === 200 && xhr.readyState === 4 ) {
      console.log('success');
      // console.log(xhr.responseText); // 전송 성공 시, 응답 받은 데이터
      // console.log(xhr.response); // 전송 성공 시, 응답 받은 데이터
      // console.log(xhr.responseXML); // 전송 성공 시, 응답 받은 데이터
      // ajax_container.innerHTML = xhr.responseText;
      // ajax_container.innerHTML = xhr.responseText;
      // var xml_doc = xhr.responseXML;
      // global.xml_doc = xml_doc;
      // var xml_doc_root = xml_doc.getElementsByTagName('user');
      // var xml_doc_results = xml_doc_root[0].getElementsByTagName('results');
      // for ( var i=0, l=xml_doc_results.length; i<l; i++ ) {
      //   console.log(xml_doc_results[i]);
      // }
      // ajax_container.innerHTML = xhr.responseXML;

      // JSON
      var Data_json2obj = global.JSON.parse(xhr.response);
      var html_template = '';
      [].forEach.call(Data_json2obj.results, function(item) {
        html_template += '<ul class="list">';
        html_template +=  `<li><img class="fl" src="${item.picture.thumbnail}" alt=""></li>`;
        html_template +=  `<li><h4>${item.gender}</h4></li>`;
        html_template +=  `<li><h2 class="user-name">${item.name.title}, ${item.name.first} ${item.name.last}</h2></li>`;
        html_template +=  `<li>${item.location.street}</li>`;
        html_template += '</ul>';
      });

      ajax_container.innerHTML = html_template;

    } else {
      // console.info('데이터 요청 중입니다.... ');
      ajax_container.innerHTML = '데이터 요청 중입니다.... ';
    }
  }

  var ajax_call_btn  = document.querySelector('.call-ajax-btn');
  var ajax_container = document.querySelector('.ajax-container');

  ajax_call_btn.addEventListener('click', function() {
    xhr.send();
    // 동기 방식 (기다리다 데이터가 전송되면 아래 조건문 실행 ..................)
    // 비동기 방식 (기다리지 않고 아래 조건문이 실행 ..................)
    // if ( xhr.status === 200 ) {
    //   console.log('success');
    //   console.log(xhr.responseText); // 전송 성공 시, 응답 받은 데이터
    //   ajax_container.innerHTML = xhr.responseText;
    // } else {
    //   console.log('기다리지 않겠어!!! ');
    // }
  });

})(this, this.XMLHttpRequest);