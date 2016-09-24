/*! fde.js © yamoo9.net, 2016 */

/** @function initialization */
function initialization() {
  // 문서에서 <p> 요소를 찾아 변수에 참조
  // 문서에서 첫번째 <p> 요소를 찾아온다.
  var target_p = document.getElementsByTagName('p').item(0);
  // console.log(target_p);

  // 단계 1.
  // <h1> 요소를 생성하고,
  var headline = document.createElement('h1');
  // 텍스트 내용으로 `JavaScript Log` 라고하는 텍스트를 동적으로 생성한다.
  var headline_content = document.createTextNode('JavaScript Log');
  // 생성된 각 노드(Node) 검증
  // console.log('headline:', headline);
  // console.log('headline_content:', headline_content);
  // 각 노드를 합치기(둘 중 하나는 부모 노드, 자식 노드가 되어야 함)

  // 단계 2.
  // DOM API: ~ 자식으로 삽입
  // 부모노드.appendChild(자식노드)
  headline.appendChild(headline_content);
  // 합쳐진 노드 결과 검증
  // console.log('headline:', headline);

  // 단계 3.
  // DOM API: ~ 앞에 삽입
  // 목표노드.부모노드.insertBefore(삽입노드, 목표노드);
  target_p.parentNode.insertBefore(headline, target_p);

}

// window.alert('excute javascript code');
// initialization(); // 함수는 언제 실행되어야 하는가? -> 문서가 로드된 이후

window.onload = initialization;