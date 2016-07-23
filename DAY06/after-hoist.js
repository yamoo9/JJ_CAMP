// ---------------------------
// 호이스트 후
// ---------------------------
function checkValue() {
  // 지역 변수 (스코프로 끌어 올려짐)
  var check; // undefiend
  // ※ 조건은 참이 된다.
  if (!check) {
    check = '로컬 체크';
    console.log(check); // '로컬 체크'
  }
  console.log(check); // '로컬 체크'
}
// 전역 변수
var check = '글로벌 체크';

checkValue();

console.log(check); // '글로벌 체크'