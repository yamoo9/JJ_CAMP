/*! ui-carousel.js © yamoo9.net, 2016 */

// --------------------------------------------------------------------------------------------
// TODO:
//
// 0. 캐러셀 탭 패널을 감싼 `래퍼 요소의 너비`를 `탭 패널 너비 × 탭 패널 개수`로 설정한다.
// 1. 인디케이터 탭 버튼을 누르면 캐러셀 콘텐츠는 해당 콘텐츠를 보여준다.
// 2. 이전/다음 탐색 버튼을 누르면 캐러셀 콘텐츠는 슬라이드 되어 콘텐츠를 보여준다. (인디케이터 탭 업데이트)
// 3. 3초마다 자동으로 다음 콘텐츠를 보여줄 수 있도록 설정한다.
// 4. 마우스가 캐러셀 영역으로 들어가면 자동 넘김이 멈추고, 마우스가 캐러셀 영역 밖으로 나가면 자동 넘김이 다시 시작한다.
// 5. 인디케이터 탭 또는 이전/다음 탐색 버튼에 포커스가 되면 자동 넘김이 멈춰야 한다.
// 6. 자동 넘김 또는 넘김 시간 등은 옵션으로 설정할 수 있도록 변경한다.
// 7. 객체 지향 자바스크립트 방식으로 코드를 변경한다. (e.g: new Carousel('#bs3-headphone') )
// --------------------------------------------------------------------------------------------

(function(global){
  'use strict';

  // -------------------------------------------------------------------------
  // 문서 객체 참조

  var doc         = global.document;
  var carousel    = doc.querySelector('.ui-carousel');
  var tab_wrapper = carousel.querySelector('.ui-carousel-tabpanel-wrapper');

  // -------------------------------------------------------------------------
  // 이벤트 핸들러

  /** @function resizeCarouselHeight() 캐러셀 컴포넌트 높이를 변경하는 함수 */
  var resizeCarouselHeight = function() {
    var tab_panel = tab_wrapper.querySelector('.ui-carousel-tabpanel');
    carousel.style.height = tab_panel.clientHeight + 'px';
  };

  // -------------------------------------------------------------------------
  // 이벤트 핸들링

  global.addEventListener('DOMContentLoaded', resizeCarouselHeight);
  global.addEventListener('resize', resizeCarouselHeight);

})(this);
