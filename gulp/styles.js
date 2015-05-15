// -----------------------------------------------------------------|
// STYLES TASKS
// -----------------------------------------------------------------|
'use strict';

// LIBSASS OPTIONS
// --------------------------------------|
var optsSass = {
	outputStyle: 'nested',
	precision: 10,
	includePaths: [
		'.',
		'app/css/',
		'bower_components/',
		'bower_components/bourbon/app/assets/stylesheets/',
		'bower_components/flexboxgrid/src/sass/',
		'bower_components/animate.css/source/',
	]
};

// AUTOPREFIXER OPTIONS
// --------------------------------------|
var optsAutoprefixer = {
	browsers: [
		'> 1%',
		'last 2 versions',
		'Firefox ESR',
		'Opera 12.1',
		'ie 9',
		'Safari 6'
	]
};

// POSTCSS OPTIONS
// --------------------------------------|
var optsPostCSS = [
	require('autoprefixer-core')(optsAutoprefixer),
	require('postcss-zindex'),
	require('css-mqpacker'),
];

module.exports = function (gulp, $, reload, merge) {

	// DEVELOPMENT STYLES
	// --------------------------------------|
	gulp.task('styles:dev', function() {
		// Init our souremaps
		// Compile our scss files
		// Use PostCSS
		// Write our sourcemap
		// Output to our .tmp folder
		// Reload browser
		// NOTE: Can't return stream here as sass errors prevent watch task
		gulp.src([
				'app/css/**/*.scss'
			])
			.pipe($.sourcemaps.init())
			.pipe($.sass(optsSass))
			.on('error', function(err) {
				$.notify.onError({
					message: 'SASS failed!\n' + err.message + ' on line ' + err.line
				})(err)
			})
			.pipe($.postcss(optsPostCSS))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('.tmp/css'))
			.pipe(reload({
				stream: true
			}));
	});

	// PRODUCTION STYLES
	// --------------------------------------|
	gulp.task('styles:prod', function() {
		// Init our souremaps
		// Compile our scss files
		// Use PostCSS
		// Write our sourcemap
		// Output to our .tmp folder
		// Output to our dist/dev/css folder
		var styles = gulp.src([
				'app/css/**/*.scss'
			])
			.pipe($.sourcemaps.init())
			.pipe($.sass(optsSass))
			.pipe($.postcss(optsPostCSS))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('.tmp/css'))
			.pipe(gulp.dest('dist/dev/css'));

		// Copy sourcemap to dist/dev/css folder
		var sourcemap = gulp.src([
				'.tmp/css/**/*.map'
			])
			.pipe(gulp.dest('dist/dev/css'));

		// Merge streams
		return merge(styles, sourcemap);
	});
};
