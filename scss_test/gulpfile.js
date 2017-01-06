var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


var paths = {
	css : './css/*.css', 
	scss : './scss/*.scss'
}

gulp.task('compile-sass',function(){
	return gulp.src(paths.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle:'compressed'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css'))

});
gulp.task('sass:watch',function(){
	gulp.watch(paths.scss,['compile-sass']);
});

//gulp.task('sass',['compile-sass']);