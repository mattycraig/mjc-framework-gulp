// -----------------------------------------------------------------|
// HELPERS TASKS
// -----------------------------------------------------------------|
'use strict';

// -----------------------------------------------------------------|
// SET DEV ENVIRONMENT?
// -----------------------------------------------------------------|
// Wehn true, compiles files to /dist/dev folder upon building
// Outputs non minified css/js files and jade components
global.devEnv = false;
// -----------------------------------------------------------------|

module.exports = (gulp, $, merge, config) => {

	// CLEAN TMP + DIST FOLDERS + OUTPUT JSON
	// --------------------------------------|
	gulp.task('clean', require('del').bind(null, [
		'.tmp',
		'dist',
		'app/json/__output.json',
		'app/scss/config/vars/__output.scss'
	]));

	// CLEAN CSS + DEV CSS FOLDERS
	// --------------------------------------|
	gulp.task('clean:styles', require('del').bind(null, [
		'dist/css',
		'dist/dev/css'
	]));

	// CLEAN JS + DEV JS FOLDERS
	// --------------------------------------|
	gulp.task('clean:scripts', require('del').bind(null, [
		'dist/js/app.js',
		'dist/dev/js'
	]));

	// CLEAN SASS JSON VARS
	// --------------------------------------|
	gulp.task('clean:json', require('del').bind(null, [
		'app/json/__output.json'
	]));

	// INJECT BOWER DEPENDENCIES
	// --------------------------------------|
	gulp.task('wiredep', () => {
		var wiredep = require('wiredep').stream;

		return gulp.src(config.wiredep.src)
			.pipe(wiredep({
				exclude: [
					'bootstrap-sass-official/assets/javascripts/bootstrap.js',
					'outdated-browser/outdatedbrowser/outdatedbrowser.min.js'
					// 'modernizr'
				],
				ignorePath: '../../../../'
			}))
			.pipe(gulp.dest(config.wiredep.dest));
	});

	// COPY ALL ROOT FILES + DEV JS FILES FROM TMP TO DIST
	// --------------------------------------|
	gulp.task('copy', () => {

		// Root files
		var rootFiles = gulp.src(config.copy.src.files, {
				dot: true
			})
			.pipe(gulp.dest(config.copy.dest.prod));

		// Script files
		var scriptFiles = gulp.src(config.copy.src.js)
			.pipe($.if(global.devEnv, gulp.dest(config.copy.dest.dev)));

		return merge(rootFiles, scriptFiles);

	});
};
