/*! gallery.js © yamoo9.net, 2016 */

// 갤러리 컨트롤 버튼을 문서에서 탐색하여 찾습니다.
var gallery_buttons = document.querySelectorAll('.gallery-control-button');
var gallery_view = document.querySelector('.gallery-view');
var gallery_view_img = gallery_view.querySelector('img');
// var gallery = document.querySelector('.gallery');
// var gallery_buttons = gallery.querySelectorAll('.gallery-controls .gallery-control-button');

// NodeList [button.gallery-control-button, button.gallery-control-button, button.gallery-control-button]
// console.log(gallery_buttons);

// 수집한 버튼들을 반복문을 사용하여 버튼 내부의 img 요소의 src, alt을 확인한다.
var buttons_count = gallery_buttons.length; // 3

for ( var i=0; i<buttons_count; i++ ) {
  // console.log(i, gallery_buttons[i]);
  var button = gallery_buttons[i];
  // 반복 순환되고 있는 버튼 요소에 이벤트 연결
  button.addEventListener('click', function() {
    var img = this.querySelector('img');
    var img_src = img.getAttribute('src');
    var img_alt = img.getAttribute('alt');
    // console.log(src, alt);
    // gallery_view_img 요소노드의 alt, src 속성 값 변경
    gallery_view_img.setAttribute('src', img_src.replace('thumb-',''));
    gallery_view_img.setAttribute('alt', img_alt);
  });
}