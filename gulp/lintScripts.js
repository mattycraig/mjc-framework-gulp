// -----------------------------------------------------------------|
// LINT SCRIPTS TASK
// -----------------------------------------------------------------|
'use strict';

module.exports = (gulp, $, browserSync, reload, handleError, config) => {

	// LINT SCRIPTS
	// --------------------------------------|
	// gulp.task('lint:scripts', () => {
	// 	// Lint using ESLint
	// 	// Report errors
	// 	return gulp.src(config.lintscripts.src.js)
	// 		.pipe(reload({
	// 			stream: true,
	// 			once: true
	// 		}))
	// 		.pipe($.eslint())
	// 		.pipe($.eslint.format())
	// });

	gulp.task('lint:scripts', function() {
		// Lint using JSCS
		// Lint using JSHint
		// Report errors
		return gulp.src(config.lintscripts.src.js)
			.pipe(reload({
				stream: true,
				once: true
			}))
			.pipe($.jscs())
			.on('error', handleError('JSCS'))
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish'))
			.pipe($.jshint.reporter('fail'))
			.on('error', handleError('JSHint'));
	});

	// LINT GULPFILE(S)
	// --------------------------------------|
	gulp.task('lint:gulp', () => {
		// Lint using ESLint
		// Report errors
		return gulp.src(config.lintscripts.src.js)
			.pipe($.eslint())
			.pipe($.eslint.format());
	});

	// gulp.task('lint:gulp', function() {
	// 	// Lint using JSCS
	// 	// Lint using JSHint
	// 	// Report errors
	// 	return gulp.src(config.lintscripts.src.gulp)
	// 		.pipe($.jscs())
	// 		.on('error', handleError('JSCS'))
	// 		.pipe($.jshint())
	// 		.pipe($.jshint.reporter('jshint-stylish'))
	// 		.pipe($.jshint.reporter('fail'))
	// 		.on('error', handleError('JSHint'));
	// });
};
