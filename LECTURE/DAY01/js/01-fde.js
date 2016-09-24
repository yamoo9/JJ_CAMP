/*! fde.js © yamoo9.net, 2016 */

/** @function initialization */
function initialization() {
  // 문서에서 <p> 요소를 찾아 변수에 참조
  // 문서에서 첫번째 <p> 요소를 찾아온다.
  var target_p;
  target_p = document.getElementsByTagName('p').item(0);

  console.log(target_p);

}

// window.alert('excute javascript code');
// initialization(); // 함수는 언제 실행되어야 하는가? -> 문서가 로드된 이후

window.onload = initialization;