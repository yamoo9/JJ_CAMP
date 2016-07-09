/*! demo-gallery.js © yamoo9.net, 2016 */

// DOM-Helper.js의 함수 검증
// console.log( !!$query );

// 문서에서 제어할 갤러리 요소노드를 참조
var gallery = $query('.gallery');
var gallery_buttons = $queryAll('.gallery-control-button', gallery);
var gallery_view_img = $query('.gallery-view img');

// console.log(gallery_buttons);
// console.log(gallery_buttons.length);

// 문서에서 선택한 버튼 객체들(노드리스트)에게 클릭 이벤트를 바인딩
// 노드리스트는... 복수이기 때문에 반복문을 사용해야 한다. (이벤트 처리를 위해)
for ( var button, i=0, l=gallery_buttons.length; i<l; i++ ) {
  // console.log(i); // looping index
  button = gallery_buttons[i];
  // console.log(button); // <button> BlementNode
  // 클릭 이벤트 연결
  // 웹의 초창기 이벤트 모델
  // 장점: 크로스 브라우징
  // 단점: 한 요소에 한 이벤트를 하나만 연결
  button.onclick = function() {
    // 자바스크립트 호이스팅
    var img, g_img_alt, g_img_src;
    // this 키워드가 참조하는 객체는 바로 이벤트의 주인
    // 탐색(하위 자식 중 첫번째 요소노드를 찾았다)
    img = this.firstElementChild;
    // 오래된 방식으로 속성 값을 가져오는 방법 (사용하지 말자!)
    // ※ Local Testing의 경우, file:/// 값을 가져옴.
    // console.log(img, img.alt, img.src);
    // 모던 방식으로 속성을 가져와야 한다(권장)
    g_img_src = img.getAttribute('src').replace(/-thumb/,'');
    g_img_alt = img.getAttribute('alt');
    // console.log(img, g_img_src, g_img_alt);
    // console.log( gallery_view_img );
    gallery_view_img.setAttribute('src', g_img_src);
    gallery_view_img.setAttribute('alt', g_img_alt);
    // ----------------------------------------------------------------------
    // 클릭한 this(<button>) 요소에 active 클래스 추가
    // this.setAttribute('class', 'active');
    // 신기술 사용 classList
    // 형제 중에 .active 가진 형제요소에서 active 클래스 속성을 제거
    var sibling_has_active = $query('.active', this.parentNode);
    if (sibling_has_active) { sibling_has_active.classList.remove('active'); }
    this.classList.add('active');
    // ----------------------------------------------------------------------
  };
  // 표준 진보 이벤트 모델
  // 장점: 한 요소에 다수의 이벤트를 연결
  // 단점: 크로스 브라우징 X (IE 9+)
  // button.addEventListener('click', function() {});
}