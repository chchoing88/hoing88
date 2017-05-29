/**
 * Created by merlin.ho on 2017. 4. 28..
 */
var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps'), // sourcemaps 호출
    scss = require('gulp-sass'),
    watch = require('gulp-watch'),
  sassInheritance = require('gulp-sass-inheritance'),
  cache = require('gulp-cached'),
  dependencies = require('gulp-dependencies'),
  sassGrapher = require('gulp-sass-grapher'),
  sassGraph = require('gulp-sass-graph'),
  path = require('path'),
  sassGraph = require('sass-graph'),
  gutil = require('gulp-util');
var vinylPaths = require('vinyl-paths');





var scssOptions = {
  outputStyle : "compact"
};

gulp.task('scss',function(){
  var loadPaths = path.resolve('./src/scss');
  sassGrapher.init('./src/scss', { loadPaths: loadPaths });

  return gulp.src('./src/scss/*.scss')
    .pipe(watch('./src/scss/*.scss',{ base: path.resolve('./src/scss') }))
    //.pipe(sourcemaps.init())
    //.pipe(cache('sass'))
    //.pipe(sassInheritance({dir: './src/scss/'}))
    /*.pipe(dependencies({

      // extract 'imports' and append '.scss'
      match  : /@import\s+'(.+)'/g,
      replace: function(f) { return f + ".scss"; },

      // destination and extension for output files
      dest   : "./scr/css",
      ext    : ".css"
    }))*/

    .pipe(sassGrapher.ancestors())
    .pipe(scss(scssOptions).on('error',scss.logError))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'))
});

gulp.task('default',function(){
  // gulp.watch('./src/scss/*.scss',['scss']);
  console.log(sassGraph.parseDir('src/scss'));
  console.log(sassGraph.parseDir('src/scss').index['/Users/merlin.ho/hoing88/gulpTest/src/scss/test1.scss'].importedBy)
  console.log(sassGraph.parseFile('/Users/merlin.ho/hoing88/gulpTest/src/scss/test1.scss'))
});

var filePath = [];
// 파일명 알아오기...
gulp.task('diff',function(){
  //gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));
  return gulp.src('./src/css/**/*.css')
    .pipe(vinylPaths(function (paths) {
      //console.log('Paths:', paths);
      filePath.push(paths);
      return Promise.resolve();
    }))
    .pipe(gulp.dest(''))
    .on('end',function(){
      console.log(filePath);
    });

});

