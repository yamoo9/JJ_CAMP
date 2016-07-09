###### Fast Campus

## [JavaScript & jQuery 정복 CAMP](http://www.fastcampus.co.kr/dev_camp_jst/)

# DAY03

### 지난 수업에서 공부한 내용 복습!

[JJ_CAMP__TEST 2016/07/03](http://goo.gl/forms/vrh7guI8h2KSKpcD3)

-

### JavaScript 시작하기 & 핵심 정복기

- 문서객체모델(DOM) : 탐색
- 선택/탐색과 관련한 헬퍼 함수 만들기
- 문서객체모델(DOM) : 조작
- 조작과 관련한 헬퍼 함수 만들기

-

### 문서객체모델(DOM) **탐색**

- 문서 객체 탐색
  - 부모 찾기
  - 형제 찾기
  - 자손 찾기
  - 자식 찾기

![DOM_Traversal](../Assets/DOM_Traversal.png)

-

### 선택/탐색과 관련한 헬퍼 함수 만들기

- `idEl()`
- `tagEl()`
- `classEl()`
- `$query()`
- `$gueryAll()`

```js
/**
 * $queryAll 함수 정의
 * @function $queryAll
 *
 * @param  { string }                            selector    CSS 선택자 문자열
 * @param  { undefined | string | ElementNode }  context     컨텍스트 요소노드 (컨텍스트 전달인자가 없을 경우 document 객체로 초기화)
 * @return { NodeList }                                      CSS 선택자로부터 수집된 HTML 콜렉션(Collection)을 반환
 */
function $queryAll(selector, context) {
  // ------------------------------------------------------------------------
  // 유효성 검사(Validation Function Argument)
  // ------------------------------------------------------------------------
  // selector 값이 CSS 선택자 문자열이 아닐 경우 오류 발생
  if (typeof selector !== 'string') {
    throw new Error('전달된 1번째 인자는 CSS 선택자(문자열)이어야 합니다.');
  }
  // context 값이 전달되었는데 요소노드도 아니면서 문자열도 아닌 경우라면 오류 발생
  if ( context && context.nodeType !== 1 && typeof context !== 'string' ) {
    throw new Error('전달된 2번째 인자는 요소노드이거나, CSS 선택자(문자열)이어야 합니다.');
  }

  // ------------------------------------------------------------------------
  // 전달된 컨텍스트가 전달되지 않았거나, 또는 요소노드가 아니고, CSS 선택자 문자열이라면 실행
  // ------------------------------------------------------------------------
  if ( typeof context === 'string' ) {
    context = $query(context);
  }

  // ------------------------------------------------------------------------
  // 수행 결과 반환(Return Function Resule)
  // ------------------------------------------------------------------------
  return (context || document).querySelectorAll(selector);
}
```