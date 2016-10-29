
// 사람을 만들고 싶다.
var cocoaman = new y9.Person(
  '코코아맨',
  '남성',
  23,
  '167cm',
  '52kg',
  '독서',
  '건강',
  '식도염'
);

console.log('cocoaman:', cocoaman);

console.log('%c------------------------------', 'color: #3d9a21');

// 알고 보니 이 사람은 선생님이었다. 선생님으로 변경하자.
// cocoaman.subject = '코코아 열매 부수기';
// cocoaman.career  = '12년';
// cocoaman.major   = '열매 빻기';

var teacher_cocoaman = new y9.Teacher(
  cocoaman,
  '코코아 열매 부수기',
  '12년',
  '열매 빻기'
);

console.log('teacher_cocoaman:', teacher_cocoaman);

console.log('%c------------------------------', 'color: #3d9a21');

var student_cocoaman = new y9.Student(
  cocoaman,
  '2학년',
  '2021년',
  '영어',
  '수학'
);

console.log('student_cocoaman:', student_cocoaman);

var a = new y9.Person();
var b = new y9.Person();
var c = new y9.Person();
var d = new y9.Person();