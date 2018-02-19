/**
 * Created by merlin.ho on 2017. 7. 6..
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var change = require('gulp-change');
var sassGraph = require('sass-graph');
var gulpCopy = require('gulp-copy');

var src_mo = {
  css : './test',
  scss : './src/scss'  // scss 경로
};


// 두줄 newline 한줄 newline 으로 바꾸는 함수.
function editFileContents(content,done){
  var result = content;
  result =  result.replace(/\n\s*\n/g, '\n');
  done(null,result);
}



gulp.task('sassTest',function(){
  console.log(sassGraph.parseDir(src_mo.scss));
  var index = sassGraph.parseDir(src_mo.scss).index; // 인덱스 객체

  function pathAdd(sassGraphObj,url){
    var path = [];
    // 의존성 ( import 된것들 ... 파악 )
    function searchDependecy(sassGraphObj,url){
      path.push(url);

      if(sassGraphObj.importedBy !== undefined
        && sassGraphObj.importedBy !== null
        && Object.prototype.toString.call(sassGraphObj.importedBy) == '[object Array]'){

        var length = sassGraphObj.importedBy.length;
        if(length !== 0){
          for(var i = 0; i < length; i++){
            searchDependecy(index[sassGraphObj.importedBy[i]],sassGraphObj.importedBy[i]);
          }
        }

      }else{

      }
    }

    searchDependecy(sassGraphObj,url);

    return path;

  }

  for( var key in index ){ // key : scss 파일들...
    (function(watchUrl){ // watchUrl scss파일들..
      watch(watchUrl,function(e){ // 변경된 scss 파일을 watch 하자.. e 는 'vinyl' 참고..

        var path = []; // 변경된 scss 파일 목록을 배열로 저장하는곳..
        var destPath = []; // 도착지 css 폴더.

        path = pathAdd(index[e.path],e.path); // scss 관련자들 모두 path에 넣자..

        console.log(path);

        gulp.src(path)
          .pipe(sass({outputStyle:'compact'}).on('error', sass.logError)) // sass 돌림..
          .pipe(gulp.dest(function(file){

            var fileName = file.path.split('/');
            var fileNameLength = fileName.length;
            fileName = '/'+fileName[fileNameLength-1];

            destPath.push(src_mo.css+fileName);

            return src_mo.css;

          })).on('end',function(){
          console.log(destPath);
          gulp.src(destPath)
            .pipe(change(editFileContents))  // 공백 정리...
            .pipe(gulp.dest(function(file){
              return file.base;
            }))
            .pipe(gulp.dest('./test1'));

        });
      })
    })(key);

    // 다른경로로 보내기...
  }

});


gulp.task('sass',['sassTest']);