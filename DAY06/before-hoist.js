
// ---------------------------
// 호이스트 전
// ---------------------------
// 전역 변수
var check = '글로벌 체크';

checkValue();

function checkValue() {
  if (!check) {
    // 지역 변수
    var check = '로컬 체크';
    console.log(check); // ?
  }
  console.log(check); // ?
}

console.log(check); // ?