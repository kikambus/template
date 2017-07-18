/*
*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*				 							That FILE only for markup;
*				 									src/dist;
*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* */

var gulp 			= require('gulp'),
	imagemin 		= require('gulp-imagemin'),
	concat 			= require('gulp-concat'),
	rigger 			= require('gulp-rigger'),
	uglify 			= require('gulp-uglify'),
	babel 			= require('gulp-babel'),
	merge 			= require('merge-stream'),

	// minifyCss		= require('gulp-minify-css'),
	autoprefixer 	= require('gulp-autoprefixer'),
	compass         = require('gulp-compass'),
	cleanCSS 		= require('gulp-clean-css');


/**********************************************
               		- JS -
**********************************************/
gulp.task('js', function() {
		gulp.src(['src/js/cash/jquery-2.2.3.min.js', 'src/js/cash/*.*'])
			.pipe(concat('cash.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'));

		var withOutBabel = gulp.src([
			'path'
		])
		.pipe(concat('main.js'));
		
		var withBabel = gulp.src([
			'path'
		])
		.pipe(babel({
        	presets: ['es2015']
    	}))
    	.pipe(concat('main.js'));

    	merge(withOutBabel, withBabel)
    		.pipe(concat('main.js'))
    		.pipe(gulp.dest('dist/js'));
});
/*********************************************/
/*********************************************/


/**********************************************
               		- HTML -
**********************************************/
gulp.task('html', function () {
	gulp.src('src/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist'));
});
/*********************************************/
/*********************************************/


/**********************************************
           - TEMPLATES (partials) -
**********************************************/
gulp.task('templates', function () {
	gulp.run('html');
});
/*********************************************/
/*********************************************/


/**********************************************
               		- IMAGES -
**********************************************/
gulp.task('images', function () {
	gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('dist/images'))
});
/*********************************************/
/*********************************************/


/**********************************************
 					- SASS -
 **********************************************/
gulp.task('sass', function () {
	gulp.src(['./src/sass/**/*.scss'])
		.pipe(compass({
			css: './src/css',
			sass: './src/sass',
			image: './src/images'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(cleanCSS())
		//.pipe(cleanCSS({compatibility: 'ie10'}))
		.pipe(gulp.dest('./dist/css'));
});
/*********************************************/
/*********************************************/


/**********************************************
               		- WATCH -
**********************************************/
gulp.task('watch', function() {
	gulp.watch('./src/js/**/*', ['js']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/images/*', ['images']);
	gulp.watch('./src/templates/*.html', ['templates']);
	gulp.watch('./src/*.html', ['html']);
});
/*********************************************/
/*********************************************/


gulp.task('default', ['js'/*, 'css'*/, 'sass', 'html', 'images', 'templates', 'watch']);