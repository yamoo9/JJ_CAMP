/*! fde.js © yamoo9.net, 2016 */

/** @function initialization */
function initialization() {
  // var body = document.getElementsByTagName('body').item(0); // XML DOM 방식
  var body = document.body; // HTML DOM 방식
  // 문서에서 <p> 요소를 찾아 변수에 참조
  // 문서에서 첫번째 <p> 요소를 찾아온다.
  var target_p = document.getElementsByTagName('p').item(0);
  // console.log(target_p);

  // 호출할 함수
  window.setTimeout(function() {
    createHeadline('h1', 'JavaScript Log', target_p);
  }, 2000);

  /**
   * --------------------------------
   * ul 생성
   * li 생성 x3
   * 콘텐츠 생성 x3
   * li + 콘텐츠 접합 x3
   * ul + li x3 접합
   * ul > target_p 뒤에 삽입
   */

  // <ul>
  //   <li>IOT</li>
  //   <li>VR</li>
  //   <li>IT</li>
  // </ul>

  var categories = 'IOT VR IT'.split(' ');
  // console.log(categories);

  // Legacy 방법
  // var a = 0, l = categories.length;
  // for( ; a<l; a=a+1 ) {
  //   console.log( categories[a], a );
  // }

  // 크로스 브라우징 이슈: ES5 Shim JS Library
  // Modern 방법

  var ul = document.createElement('ul');

  categories.forEach(function(item, index) {
    // console.log(item, index);
    // <li>item</li>
    var li = document.createElement('li');
    var li_content = document.createTextNode(item);
    li.appendChild(li_content);
    // <ul> 요소 내부에 삽입
    ul.appendChild(li);
  });

  // console.log(ul);
  body.appendChild(ul);

  // ES2015
  // for (category of categories) {
  //   console.log(category);
  // }


}

/** @function createHeadline */
function createHeadline(h_lv, content, target) {
  // 유효성 검사
  if( typeof h_lv !== 'string' ) { throw new Error('첫번째 인자는 문자열이어야 한다.'); }
  if( typeof content !== 'string' ) { throw new Error('두번째 인자도 문자열이어야 한다.'); }
  if( target && target.nodeType !== 1 ) { throw new Error('세번째 인자는 요소노드여야 한다.'); }
  // 단계 1.
  // <h1> 요소를 생성하고,
  var headline = document.createElement(h_lv);
  // 텍스트 내용으로 `JavaScript Log` 라고하는 텍스트를 동적으로 생성한다.
  var headline_content = document.createTextNode(content);
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
  if ( target ) {
    target.parentNode.insertBefore(headline, target);
  }
  return headline;
}

// window.alert('excute javascript code');
// initialization(); // 함수는 언제 실행되어야 하는가? -> 문서가 로드된 이후

window.onload = initialization;