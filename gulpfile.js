var gulp 			= require('gulp'),
	connect 		= require('gulp-connect'),
	imagemin 		= require('gulp-imagemin'),
	concat 			= require('gulp-concat'),
	rigger 			= require('gulp-rigger'),
	uglify 			= require('gulp-uglify'),
	babel 			= require('gulp-babel'),
	merge 			= require('merge-stream'),

	browserify 		= require('browserify'),
	source 			= require('vinyl-source-stream'),
	babelify 		=  require('babelify'),

	//merge 			= require('merge-stream'),

	autoprefixer 	= require('gulp-autoprefixer'),
	compass         = require('gulp-compass'),
	cleanCSS 		= require('gulp-clean-css');

/**********************************************
 					- SERVER -
 **********************************************/
gulp.task('connect', function () {
	connect.server({
		base: 'http://localhost',
		root: './dist',
		port: 9000,
		livereload: true
	});
});
/*********************************************/
/*********************************************/


/**********************************************
               		- JS -
**********************************************/
gulp.task('js', function() {
	browserify('./src/js/main.js')
		.transform(babelify, {presets:['es2015']})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest("./dist/js"))
		.pipe(connect.reload());
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


gulp.task('default', ['js'/*, 'css'*/, 'sass', 'html', 'images', 'templates', 'connect', 'watch']);


// gulp.src(['src/js/jquery.min.js', 'src/js/*.*'])
// 	.pipe(concat('test.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('dist/js'));

// 	var withOutBabel = gulp.src([
// 		'src/js/vendors/jquery-2.2.3.min.js',
// 	])
// 	.pipe(concat('main.js'));

// 	var withBabel = gulp.src([
// 		'src/js/utils/*.*',
// 		'src/js/components/**/*.*',
// 	])
// 	.pipe(babel({
// 		presets: ['es2015']
// 	}))
// 	.pipe(concat('main.js'));

// 	merge(withOutBabel, withBabel)
// 		.pipe(concat('main.js'))
// 		.pipe(gulp.dest('dist/js'));