/**
 * --------------------------------------
 * 모델 객체를 생성(클로저 객체를 반환)하는 함수 정의
 * ----------------------------------- */
function modelMaker(item) {
  // 캡슐화
  // 외부와 구분되는(접근이 불가능한) 변수 선언
  var _model = [];
  item && _model.push(item);
  // 외부에 반환되어 추후에 객체의 멤버를 통해
  // 접근이 불가능한 변수에 접근하여 처리할 수 있다.
  return {
    'addItem': function(item) {
      _model.push(item);
    },
    'removeItem': function(index) {
      if(!index) {
        _model.pop();
      } else {
        _model.shift();
      }
    },
    'print': function() {
      return _model;
    },
    'getItem': function(index) {
      return _model[index];
    },
    'setItem': function(index, new_item) {
      _model[index] = new_item;
    }
  };
}