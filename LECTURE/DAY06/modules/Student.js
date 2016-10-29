/*! Student.js © yamoo9.net, 2016 */

/*

학생(student)
  - 학년(grade)
  - 졸업년도(graduation)
  - 좋아하는 과목(like subject)
  - 싫어하는 과목(hate subject)

  - 이름(name)
  - 성별(gender)
  - 나이(age)
  - 키(height)
  - 몸무게(weight)
  - 건강(health)
  - 질병(sickness)

*/

(function(global, y9){
  'use strict';

  /** @constructor Student */
  var Student = function (
    person,
    grade,
    graduation,
    like_subject,
    hate_subject
  ) {
    if ( !(person instanceof y9.Person) ) {
      throw new Error('첫번째 인자는 Person 생성자를 사용하여 생성된 객체여야 합니다.');
    }
    this.person       = person;
    this.grade        = grade;
    this.graduation   = graduation;
    this.like_subject = like_subject;
    this.hate_subject = hate_subject;
    this.studying     = studying;
  };

  function studying(how) {
    return this.person.name + '은 ' + how + ' 공부를 한다.';
  };

  // global.Student = Student;
  y9.Student = Student;

})(this, (this.y9 = this.y9 || {}) );