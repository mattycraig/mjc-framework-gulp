// -----------------------------------------------------------------|
// HELPERS TASKS
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, merge, config) => {

	// CLEAN TMP AND DIST FOLDERS
	// --------------------------------------|
	gulp.task('clean', require('del').bind(null, [
		'.tmp',
		'dist'
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
		var rootFiles = gulp.src(config.copy.src.files, {
				dot: true
			})
			.pipe(gulp.dest(config.copy.dest.prod));

		var scriptFiles = gulp.src(config.copy.src.js)
			.pipe(gulp.dest(config.copy.dest.dev));

		// Merge streams
		merge(rootFiles, scriptFiles);
	});
};
