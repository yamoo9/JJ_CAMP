/*! DOM-API.js © yamoo9.net, 2016 */

// BOM
//  - window {}
//    - screen {}
//    - navigator {}
//    - history {}
//    - location {}
//    - document {}

// DOM: Document Object Model
// API: Application Programming Interface

// Level 0 (Legacy DOM)
// 문서객체에 대한 제한적 접근:
// console.log('문서에 존재하는 객체: 하이퍼링크',document.links);
// console.log('문서에 존재하는 객체: 네임드앵커',document.anchors);
// console.log('문서에 존재하는 객체: 이미지',document.images);
// console.log('문서에 존재하는 객체: 폼',document.forms[0]);
// console.log('문서에 존재하는 객체: 폼 컨트롤',document.forms[0].elements[1]);

// 과도기 DOM
// 문서의 모든 객체에 접근, CSS 속성을 조작할 수 있는 API를 각 회사가 제공.
// NN: document.layers (현재 사용 X)
// IE: document.all

// DOM Level 1 시대
// 화합: W3C 주관 양대 회사가 공통 API를 제작.
// document.getElementById('id-name');
// document.getElementsByName()
// document.getElementsByTagName('tag');
