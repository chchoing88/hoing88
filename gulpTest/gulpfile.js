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
var vinylPaths = require('vinyl-paths'),
  cp = require('child_process');
var fse = require('fs-extra');






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

var myCommit = [];
var myCommitId = [];
var since;
var myChangeData = {};

function standardCommit(){
  return new Promise(function(resolve , reject){
    // 기준 커밋 날짜 가져오기
    fse.readFile('./release.log', 'utf-8', function (err, data) {
      var releases = data.split('\n');
      var last = releases.pop();
      while (!last) last = releases.pop();
      //console.log(last);
      var cmd = ['git', 'show', '-s', '--format=%ci', last].join(' ');
      since = new Date(cp.execSync(cmd).toString()).toISOString();

      resolve();
    });
  });
}


// 기준 날짜 이후로 내 커밋 찾기
function myCommitFind(){

  //console.log(since);
  var cmd = ['git', 'log','--since=' + since , '--format="%h"', '--author=merlin.ho'].join(' ');
  var commits = cp.execSync(cmd).toString().split('\n');
  commits.pop();
  commits.pop();
  myCommitId = commits;
  console.log(commits);
  // var reg =//;
  // var length = commits.length;
  // var i = 0;
  // while(i < length){
  //   var h = commits[i].match('merlin.ho <merlin.ho@kakaocorp.com>');
  //   if(h){
  //     //console.log(h.input.slice(0,h.input.indexOf(':')));
  //     myCommitId.push(h.input.slice(0,h.input.indexOf(':')));
  //     //console.log(h.input);
  //   }
  //   i++;
  // }
  // myCommitId.pop();
  // console.log(myCommitId);
  // fse.appendFile('./release.log', releaseRevision, function (err) {
  //   if (err) gutil.log(gutil.colors.red('Error :'), ' ', err.message);
  //   else gutil.log(gutil.colors.blue('UPLOADED : ', releaseRevision));
  // });
  //return gutil.noop();
}

function findCommit(){
  standardCommit().then(
    function(){
      myCommitFind();
     changeFilePath();
    }
  );
}

// 기준 커밋으로
// function makeCheckCMD (file) {
//   return ['git', 'log', '--since=' + since, file.path].join(' ');
// }

function changeFilePath(){
  var cmd = ['git', 'diff','--name-only',myCommitId[0]+'~1',myCommitId[0] ,'src/css'].join(' ');
  var changeFilePath = cp.execSync(cmd).toString().split('\n');
  changeFilePath.pop();
  console.log(changeFilePath);
  makeFormat(myCommitId[0],changeFilePath);
}

function makeFormat(id,filePath){
  var formatId = id,
    formatFilePath = filePath;
  myChangeData[formatId] = formatFilePath;

  console.log(myChangeData);

}

function changeContents(id , path){
  var keyId = id || 'c1315e7';
  var valuePath = path || 'src/css/test3.css';
  var cmd = ['git', 'log','--word-diff','-p','-1',keyId,valuePath].join(' ');
  var diffContents = cp.execSync(cmd).toString().split('\n');
  var history = [];
  writeHistory(valuePath);


  console.log(diffContents);

  diffContents.forEach(function(obj){
    var reg = /^\{\+.*\+\}$/g;
    if(reg.test(obj)){
      writeHistory(obj);
    }
  });


}

function writeHistory(contents){
  var text = contents;
  text = text + '\n';

  fse.appendFile('./history.log',text,function(err){
    if (err) gutil.log(gutil.colors.red('Error :'), ' ', err.message);
    else gutil.log(gutil.colors.blue('UPLOADED : ', text));
  });
}

gulp.task('git',function(){
  changeContents();
  //console.log(myCommit);
});



// 1. 내 커밋을 찾는다.. ( 해당 기준 이후로 )
// 2. 내 커밋과 바로 전 커밋과 디프 하여 변경된 파일 목록을 뽑아온다.. git diff --name-only c1315e7~1 c1315e7 [css 폴더경로]
// 3. 내 커밋과 바로 전 커밋과 해당 파일을 디프하면 변경된 내역이 나온다.. git diff c1315e7~1 c1315e7 [경로]
//git log -p -1 c1315e7 src/css/test3.css : -p 하면 diff를 보여준다...

// 4. 내역을 좀 간단히... 파일명 , 수정전 , 수정후