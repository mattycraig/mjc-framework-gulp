// -----------------------------------------------------------------|
// LINT SCRIPTS TASK
// -----------------------------------------------------------------|
'use strict';

module.exports = function (gulp, $, reload, handleError) {

	// LINT SCRIPTS
	// --------------------------------------|
	gulp.task('lint:scripts', function() {

		// Lint using JSCS
		// Lint using JSHint
		// Report errors
		return gulp.src([
				'app/js/**/*.js'
			])
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
	gulp.task('lint:gulp', function() {

		// Lint using JSCS
		// Lint using JSHint
		// Report errors
		return gulp.src([
				'gulp/**/*.js',
				'gulpfile*.js'
			])
			.pipe($.jscs())
			.on('error', handleError('JSCS'))
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish'))
			.pipe($.jshint.reporter('fail'))
			.on('error', handleError('JSHint'));
	});
};
