/*! webpack.config.js © yamoo9.net, 2016 */

// Node.js에서 제공: 현재 디렉토리 경로 출력
// console.log(__dirname);

// webpack 모듈 정의
var webpack_config = {
  // entry    : 진입 파일 경로 설정
  'entry': './src/app/app.js',
  // output   : 출력 파일 경로 설정
  // path     : 출력 파일 폴더 설정
  // filename : 출력 파일 이름 설정
  'output': {
    'path': __dirname + '/dist',
    'filename': 'bundle.js'
  }
};

// webpack 모듈 공개
module.exports = webpack_config;