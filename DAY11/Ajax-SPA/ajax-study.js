/*! ajax-study.js © yamoo9.net, 2016 */
(function(global, XHR){
  'use strict';

  // Ajax (비동기 통신)를 수행할 객체 생성
  var xhr = new XHR();
  // 생성된 XHR 객체 검토
  // console.log('xhr.open:', !!xhr.open);
  // 동기(Syncronous)적으로 통신하는 방법 사용
  xhr.open('GET', 'data/data.txt', false);
  // console.log('xhr.send:', !!xhr.send);
  xhr.send();

  // Ajax 통신으로 가져온 데이터를 뿌릴 컨테이너 요소
  var container_p = document.querySelector('.ajax-container p');

  // 데이터를 받아온 후에 처리
  switch ( xhr.status ) {
    case 200:
      // console.log('전달 받은 데이터: ', xhr.response);
      // console.log('전달 받은 데이터: ', xhr.responseText);
      container_p.innerHTML = xhr.responseText;
    break;
    case 404:
    case 500:
      // 통신에 실패하면 아래 코드 출력
      console.info('아무래도... 통신에 실패한 듯 합니다. ㅠㅡㅠ');
  }


})(this, this.XMLHttpRequest);