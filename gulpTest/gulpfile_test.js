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


var myChangeData = {};

function getCommitDate(){
  return new Promise(function(resolve , reject){
    // 기준 커밋 날짜 가져오기
    fse.readFile('./release.log', 'utf-8', function (err, data) {
      if(err){
        reject();
      }else{
        var releases = data.split('\n');
        var last = releases.pop();
        while (!last) last = releases.pop();
        //console.log(last);
        var cmd = ['git', 'show', '-s', '--format=%ci', last].join(' ');
        var since = new Date(cp.execSync(cmd).toString()).toISOString();

        resolve(since);
      }

    });
  });
}


// 기준 날짜 이후로 내 커밋 찾기
function myCommitFind(sinceDate){
  var since = sinceDate;
  var cmd = ['git', 'log','--since=' + since , '--format="%h"', '--author=merlin.ho'].join(' ');
  var commits = cp.execSync(cmd).toString().split('\n');
  commits.pop();
  commits.pop();
  return commits;

}
// 해당 커밋의 변환된 파일명들을 가져온다.
function getFilePath(commitId){
  var myCommitId = commitId,
    length = commitId.length,
    i = 0;

  while(i < length ){
    var cmd = ['git', 'diff','--name-only',myCommitId[i]+'~1',myCommitId[i] ,'src/css'].join(' ');
    //임시
    var changeFilePath = cp.execSync(cmd).toString().slice(9).split('\n');
    changeFilePath.pop();

    makeFormat(myCommitId[i],changeFilePath);

    i++;
  }

  return Promise.resolve();
}

// json 포멧으로 만듬..
function makeFormat(commitId,filePath){
  var myCommitId = commitId,
    formatFilePath = filePath;

  myChangeData[myCommitId] = formatFilePath;
}


// 변경된 컨텐츠를 찾습니다.
function getChangeContents(myCommitId , path){
  var keyId = myCommitId || '';
  var valuePath = path || '';
  var cmd = ['git', 'log','-p','-1',keyId,valuePath].join(' ');
  var diffContents = cp.execSync(cmd).toString()//.split('\n');
  diffContents = diffContents.slice(diffContents.lastIndexOf('@')+1);
  //console.log(diffContents);

  var resultContents = '\n'+'--------------'+valuePath+'--------------'+'\n';
  // writeHistory('\n'+'--------------'+valuePath+'--------------'+'\n');

  var afterReg = /^\+.+/gm;
  var beforeReg = /^-.+/gm;

  var afterFound = diffContents.match(afterReg);
  var beforeFound = diffContents.match(beforeReg);

  if(beforeFound instanceof Array){
    resultContents += '[수정전]\n';
    beforeFound.forEach(function(obj){
      //writeHistory('[수정전]');
      //writeHistory(obj);
      resultContents += obj+'\n';
    });
  }

  if(afterFound instanceof Array){
    resultContents += '[수정후]\n';
    afterFound.forEach(function(obj){
      //writeHistory('[수정후]');
      //writeHistory(obj);
      resultContents += obj+'\n';

    });
  }
  writeHistory(resultContents);

}

// 컨텐츠를 파일에 씁니다.
function writeHistory(contents){
  var text = contents;
  text = text + '\n';

  fse.appendFile('./history.log',text,function(err){
    if (err) gutil.log(gutil.colors.red('Error :'), ' ', err.message);
    else gutil.log(gutil.colors.blue('UPLOADED : ', text));
  });
}

function findMyWork(){

  getCommitDate().then(
    function(since){

      var myCommitId = myCommitFind(since);
      return getFilePath(myCommitId);
    }
  ).then(
    function(){
      // gutil.log(gutil.colors.red(myChangeData));
      console.dir(myChangeData);
      var i = 0;
      for( key in myChangeData){
        writeHistory('\n'+i+' 번째 커밋'+'***********************************'+key+'***********************************');
        getChangeContents(key , myChangeData[key]);
        i++;
      }
    }
  );

}





gulp.task('git',function(){
  findMyWork();
  //console.log(myCommit);
});



// 1. 내 커밋을 찾는다.. ( 해당 기준 이후로 )
// 2. 내 커밋과 바로 전 커밋과 디프 하여 변경된 파일 목록을 뽑아온다.. git diff --name-only c1315e7~1 c1315e7 [css 폴더경로]
// 3. 내 커밋과 바로 전 커밋과 해당 파일을 디프하면 변경된 내역이 나온다.. git diff c1315e7~1 c1315e7 [경로]
//git log -p -1 c1315e7 src/css/test3.css : -p 하면 diff를 보여준다...

// 4. 내역을 좀 간단히... 파일명 , 수정전 , 수정후