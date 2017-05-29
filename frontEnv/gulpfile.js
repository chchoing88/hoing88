/**
 * Created by merlin.ho on 2017. 4. 4..
 */

// Modules 호출
var gulp = require('gulp'); // Gulp 모듈 호출
//var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');


gulp.task('combine:js', function () {
    return gulp.src(['app/b/script02.js', 'app/a/script01.js'])
        .pipe(concat('conbined.js'))
        .pipe(uglify({
            mangle : true, // 알파벳 한 글자 압축 과정 설정
            compress : true,
            preserveComments : 'some' // 'all', 또는 'some'

        }))
        .pipe( gulp.dest('dist') )
        .pipe(rename('combined.min.js'))
        .pipe( gulp.dest('dist') );
});

gulp.task('watch', function () {
    gulp.watch(['app/b/script02.js','app/a/script01.js'], ['combine:js']);
});


// Gulp.task() 를 사용해 기본(Default) 테스크를 정의
gulp.task('default',['combine:js','watch'], function () {
    // 콘솔 객체에 메시지를 기록(log)해 봅니다.
    console.log('gulp default 일이 수행되었습니다!!!');
});

gulp.task('test', function() {
        gulp.src('spec/multiply-spec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine())
});



