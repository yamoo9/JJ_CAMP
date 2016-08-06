###### Fast Campus

## [JavaScript & jQuery 정복 CAMP](http://www.fastcampus.co.kr/dev_camp_jst/)

# DAY08

### trim() 헬퍼 함수

```js
// 문자열의 좌측, 우측의 공백을 제거하는 헬퍼 함수
var trim = (function(){
  // 비공개 함수 (함수 내부의 함수)
  function _trimBefore(str) {
    return str.replace(/\s+/,'');
  }
  function _trimAfter(str) {
    return str.replace(/\s+$/,'');
  }
  // 공개 함수 (함수 내부에서 외부로 내보내지는(공개되는) 함수)
  return function(text) {
    return _trimAfter( _trimBefore(text) );
  }
})();
```

※ jQuery 라이브러리의 헬퍼함수인 [`trim()`](http://api.jquery.com/jQuery.trim/) 또한 이와 같은 방법으로 구현된 것.

-

### 조작과 관련한 헬퍼 함수

#### 속성
- `getAttr()`
- `setAttr()`
- `hasAttr()`
- `attr()`
- `removeAttr()`

#### 삽입
- `append()`
- `appendTo()`
- `prepend()`
- `prependTo()`

#### 텍스트/HTML
- `html()`
- `text()`

-

### [자바스크립트 심화 학습](../Reference/js-00-reference.md)

-

### JavaScript 객체 정복

- 생성자와 프로토타입 객체
- 리터럴 표현식
- 객체 인스턴스 유형 체크
- 정확한 값을 반환하는 객체 판별 헬퍼 함수 만들기
- 내장 생성자와 프로토타입 멤버
- 공인된 내장 프로토타입 확장
- Object, Function 객체
- 함수, 스코프, 컨텍스트, 호이스트, 클로저
- Array, String 객체
- Number, Boolean 객체
- Math, Date, RegExp 객체

-

### 기타/참고

- [You Might Not Need jQuery](http://youmightnotneedjquery.com/)