const config = {};

//basics
config.siteName = 'anothernote';
config.stylesFolder = 'styles';
config.scriptsFolder = 'scripts';

//source directory
config.src = 'src/';

//destinations
config.dest = 'dist/';
config.destJS = config.dest + config.scriptsFolder;
config.destCSS = config.dest + config.stylesFolder;

//globs
config.globs = {
	html : 	config.src + '/**/*.html',
	scss : 	config.src + config.stylesFolder + '/**/*.scss',
	scssMain: config.src + config.stylesFolder + '/main.scss',
	js : 	config.src + config.scriptsFolder + '/**/*.js',
	jsMain: config.src + config.scriptsFolder + '/index.js',
	watched : [
		config.destHTML + '/**/*.html',
		config.destJS + '/**/*.min.js',
		config.destCSS + '/**/*.min.css'
	]
};

// -------------------- Require Statements --------------------
const 	gulp             = require('gulp'),
		autoprefixer     = require('gulp-autoprefixer'),
		concat           = require('gulp-concat'),
		livereload       = require('gulp-livereload'),
		newer            = require('gulp-newer'),
		notify           = require('gulp-notify'),
		plumber          = require('gulp-plumber'),
		rename           = require('gulp-rename'),
		sass             = require('gulp-sass'),
		htmlmin			 = require('gulp-htmlmin'),
		size             = require('gulp-size'),
		uglify           = require('gulp-uglify'),
		watch            = require('gulp-watch'),
		path             = require('path'),
		cssnano          = require('gulp-cssnano'),
		sourcemaps       = require('gulp-sourcemaps'),
		lazypipe         = require('lazypipe'),
		fs               = require('fs'),
		chalk			 = require('chalk'),
		fancyLog 		 = require('fancy-log'),
		webpackConfig    = require('./webpack.config'),
		webpack 		 = require('webpack'),
		webpackStream    = require('webpack-stream');

// -------------------- Notification Icon Detection --------------------
/**
 * Checks to see if a file exists.
 *
 * @param filePath
 * @returns {*}
 */
function fileExists(filePath)
{
	try {
		return fs.statSync(filePath).isFile();
	} catch (err) {
		return false;
	}
}

const iconPath = path.join(__dirname, 'gulp.png');
const icon = fileExists( iconPath ) ? iconPath : null;

// -------------------- Plumber Error Handler --------------------
const plumberErrorHandler = function(err) {
	console.log( 'plumber error! "' + err.message + '"' );
	notify.onError({
		title: config.siteName,
		message: 'Error: <%= err.message %>',
		sound: 'Pop'
	});
	this.emit('end');
};

// -------------------- Processors --------------------

//scss compiling
const scssProcessing = lazypipe()
	.pipe(plumber, {errorHandler: plumberErrorHandler})
	.pipe(sass, {outputStyle: ':compact'})
	//.pipe(autoprefixer, 'last 2 version')
	.pipe(gulp.dest, config.destCSS)
	.pipe(size, {showFiles: true})
	.pipe(rename, { suffix: '.min' })
	.pipe(sourcemaps.init)
	.pipe(cssnano)
	.pipe(sourcemaps.write, '.')
	.pipe(gulp.dest, config.destCSS)
	.pipe(size, {showFiles: true});

// -------------------- Tasks --------------------
//html
gulp.task('html', () => {
	gulp.src(config.globs.html)
		.pipe(plumber({errorHandler: plumberErrorHandler}))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.dest));
});

//styles
gulp.task('styles', () => {
	fancyLog("-> Compiling scss:");
	gulp.src(config.globs.scssMain).pipe(scssProcessing());
});

//scripts using webpack
gulp.task('scripts', () => {
	gulp.src(config.globs.jsMain)
		.pipe(plumber({errorHandler: plumberErrorHandler}))
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest(config.destJS));
});

//watch
gulp.task('live', () => {
	gulp.watch(config.globs.html, ['html']);
	gulp.watch(config.globs.scss, ['styles']);
	gulp.watch(config.globs.js, ['scripts']);
});

//default task - one time html, styles and scripts
gulp.task('default', ['html', 'styles', 'scripts']);

//start livereload
gulp.task('serve', ['live'], () => {
	livereload.listen();

	//watch for changes on transpired templates, css, and js files
	gulp.watch(config.globs.watched, function(event) {
		gulp.src(event.path)
			.pipe(plumber({errorHandler: plumberErrorHandler}))
			.pipe(livereload())
			.pipe(notify({
					title: config.siteName
					,message: event.type + ': ' + event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was reloaded'
					//,sound: 'Pop'
					, icon: icon
				})
			);
	});
});
