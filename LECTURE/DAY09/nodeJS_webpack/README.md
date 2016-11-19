// Front-End(Client-Side) Module
// IIFE 패턴을 사용하여 전역과 구분되는 독립 공간 생성
(function(global){
  'use strict';
  global.module = function(){};
})(this);

// Server-Side Module
// 파일(File) 자체가 모듈 -> Module