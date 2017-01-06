var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


var paths = {
	css : './css/*.css', 
	scss : './scss/*.scss'
}

gulp.task('serve', ['compile-sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['compile-sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('compile-sass',function(){
	return gulp.src(paths.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle:'compressed'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());

});


// gulp.task('sass:watch',function(){
// 	gulp.watch(paths.scss,['compile-sass']);
// });
gulp.task('default', ['serve']);
//gulp.task('sass',['compile-sass']);