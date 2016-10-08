// 왜 개발자는 class 속성을 사용하지 말라고 말했나?
// (id 사용을 요구)

// CSS 제작자 입장에서는 class 속성이 필요하나...
// 모듈 디자인: BEM / OOCSS / SMACSS | .col-6 {}

// JavaScript 개발자 입장에서는 class를 통해 문서 객체를
// 찾는 것은 큰 비용이 들었기 때문. ( IE 8+ 문제 해결 )

// 문서에서 모든 요소를 수집
var filtered_el_list = [];
var all_els = document.getElementsByTagName('*');
// console.log('all_els:', all_els);
// 수집된 모든 요소를 순환하여
for( var i=0, l=all_els.length; i<l; i=i+1 ) {
  // console.log(all_els.item(i));
  var el = all_els[i];
  // class 속성 값이 존재하고, 값이 일치하는지를 확인한 후
  // 해당 요소를 반환해야 한다.
  if ( el.className === 'col-6' ) {
    filtered_el_list.push(el);
  }
}
console.log('filtered_el_list:', filtered_el_list);



// 요소노드 골라내기
// 노드리스트에서 요소노드만 골라내는 것 또한 상당한 수고가 든다.
// 이 점에 DOM 스크립트 사용 시, 탐색(Traversal)이 사용되지 않았던 이유.
var node_collection = document.body.childNodes;  // 모든 노드 유형 수집
var node_els = [];
for( var node, i = node_collection.length; (node = node_collection[--i]); ) {
  // if(node.nodeType === document.ELEMENT_NODE) {
  // nodeType
  // ELEMENT_NODE   === 1
  // ATTRIBUTE_NODE === 2
  // TEXT_NODE      === 3
  if(node.nodeType === 1) {
    node_els.push(node);
  }
}
console.log('node_els:', node_els);

var el_node_collection = document.body.children; // 요소노드 유형만 수집
console.log('el_node_collection:', el_node_collection);