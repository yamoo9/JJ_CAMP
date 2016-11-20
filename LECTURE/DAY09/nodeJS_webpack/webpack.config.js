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
    'publicPath' : 'assets',
    'path'       : __dirname + '/dist',
    'filename'   : 'bundle.js'
  },

  // 모듈 설정
  'module': {
    // 로더 설정
    'loaders': [
      // CSS 파일 -> 번들링
      {
        'test': /\.css$/,
        'loader': 'style!css'
      },
      // Sass 파일 -> CSS 파일 변환 -> 번들링
      {
        'test': /\.(sass|scss)$/,
        'loader': 'style!css!sass'
      },
      // Babel (ES6, ECMAScript 2015) -> JS 파일 변환 -> 번들링
      {
        'test': /\.js$/,
        'exclude': /node_modules/,
        // 'loader': 'babel?presets[]=es2015',
        'loader': 'babel',
        'query': {
          'presets': ['es2015']
        }
      }
    ]
  },

  // webpack-dev-server 루트 경로 설정
  'devServer': {
    'contentBase': __dirname + '/src/public'
  },

  // watch    : 관찰 모드 설정
  // 'watch': true,

  // devtool  : 소스맵 생성 설정
  // 'devtool': 'source-map'

};

// webpack 모듈 공개
module.exports = webpack_config;