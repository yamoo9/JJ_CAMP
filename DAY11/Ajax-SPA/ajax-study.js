/*! ajax-study.js © yamoo9.net, 2016 */
(function(global, XHR){
  'use strict';

  // Ajax (비동기 통신)를 수행할 객체 생성
  var xhr = new XHR();
  // 생성된 XHR 객체 검토
  // console.log('xhr.open:', !!xhr.open);
  // 동기(Syncronous)적으로 통신하는 방법 사용 [권장 X]
  // xhr.open('GET', 'data/data.txt', false);
  // 비동기(Asyncronous) 통신 방법
  // xhr.open('GET', 'data/data.txt', true);
  // xhr.open('GET', 'data/data.txt');
  // xhr.open('GET', 'data/data.html');
  // xhr.open('GET', 'data/data.xml');
  xhr.open('GET', 'data/data.json');
  // console.log('xhr.send:', !!xhr.send);
  // xhr.send();

  // 비동기 통신을 위한 이벤트 구문 작성
  xhr.onreadystatechange = function() {
    if ( this.status === 200 && this.readyState === 4 ) {
      // TEXT 요청
      // var data = this.response.split('.');
      // var template_html = [];
      // for ( var text, i=0, l=data.length; i<l; i++ ) {
      //   text = data[i];
      //   if ( text.trim() !== '' ) {
      //     template_html.push( '<p>' + text + '.</p>' );
      //   }
      // }
      // template_html = template_html.join('');
      // container.innerHTML = template_html;
      // --------------------------------------------------------------
      // HTML 요청
      // container.innerHTML = this.response;
      // --------------------------------------------------------------
      // XML 요청
      // var xmlDoc = this.responseXML;
      // var xmlDoc_root = xmlDoc.firstChild;
      // console.log(xmlDoc_root.children.length);
      // // 힘들어 ㅠㅡㅠ 포기....
      // --------------------------------------------------------------
      // JSON 요청
      var people = JSON.parse(this.response).results;
      for (var person of people) {
        console.log(person.email);
      }
    } else {
      container_p.innerHTML = '아무래도... 통신에 실패한 듯 합니다. ㅠㅡㅠ';
    }
  };

  // Ajax 통신으로 가져온 데이터를 뿌릴 컨테이너 요소
  var call_ajax_btn = document.querySelector('.call-ajax-btn');
  var container = document.querySelector('.ajax-container');
  var container_p = container.querySelector('p');

  call_ajax_btn.addEventListener('click', function() {
    xhr.send();
  });



})(this, this.XMLHttpRequest);